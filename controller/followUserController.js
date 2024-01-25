import UserModel from "../model/userModel.js";


const followUser = async (req, res) => {
  try {
    const { userId, followUserId } = req.body;

    // Check if both user and followUser exist
    const user = await UserModel.findById(userId);
    const followUser = await UserModel.findById(followUserId);

    if (!user || !followUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already following the followUser
    if (user.following.includes(followUserId)) {
      return res
        .status(400)
        .json({ message: "User is already following the specified user" });
    }

    // Update the user's following list and the followUser's followers list atomically
    const session = await UserModel.startSession();
    session.startTransaction();

    try {
      await UserModel.findByIdAndUpdate(
        userId,
        { $push: { following: followUserId } },
        { session }
      );

      await UserModel.findByIdAndUpdate(
        followUserId,
        { $push: { followers: userId } },
        { session }
      );

      await session.commitTransaction();
      session.endSession();

        res.status(200).json({ message: "User followed successfully" });
        
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Error following user:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default followUser;
