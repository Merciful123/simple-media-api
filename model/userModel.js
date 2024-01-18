import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePicture: String,
    followers: [],
    following: [],
  },
  { timeStamps: true }
);


const UserModel = mongoose.model("Users", userSchema)

export default UserModel