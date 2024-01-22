import UserModel from "../model/userModel.js";
import PostModel from "../model/postModel.js";

const getAllPosts = async (req, res) => {

  try {
    const { userId } = req.params;
    
      // Check if the user exists
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user's posts
    const userPosts = await PostModel.find({ userId }).sort({ createdAt: -1 });

      // Get posts from users the current user follows
      
    const followingPosts = await PostModel.find({
      userId: { $in: user.following },
    }).sort({ createdAt: -1 });

      // Combine user's posts and following posts
      
    const allPosts = [...userPosts, ...followingPosts];
    
      // Sort all posts by createdAt timestamp in descending order

    allPosts.sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json({ posts: allPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getAllPosts;
