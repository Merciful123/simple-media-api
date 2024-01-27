import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    postData: { type: String, required: true },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
