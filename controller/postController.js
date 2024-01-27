import PostModel from "../model/postModel.js";
import UserModel from "../model/userModel.js";

const createPost = async (req, res) => {
  try {
    const { userId, postData, username } = req.body;

    // Check if the user exists
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Create a new post
    const newPost = new PostModel({
      userId,
      postData,
      username
    });

    // Save the post to the database
    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default createPost;
