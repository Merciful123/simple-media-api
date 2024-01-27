import UserModel from "../model/userModel.js";

const getUserDetailsController = async (req, res) => {
     try {
       const { userId } = req.params;
       const user = await UserModel.findById(userId);
       res.status(200).json({ user });
     } catch (error) {
       console.error("Error fetching user details:", error);
       res.status(500).json({ message: "Internal Server Error" });
     }
}

export default getUserDetailsController