import PostModel from "../model/postModel.js";

const singleUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const postCount = await PostModel.countDocuments({ userId });
    res.json({ postCount });
  } catch (error) {
    console.log(error);
    res.state(500).json({ error: "internal server error" });
  }
};

export default singleUserPosts;
