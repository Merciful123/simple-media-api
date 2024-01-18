import bcrypt from "bcrypt";
import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  console.log("running");
  try {
    const salt = await bcrypt.genSalt(10);
    let hashedPass = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPass;

    const newUser = new UserModel(req.body);

    const { name } = req.body;

    const oldUser = await UserModel.findOne({ name });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registered" });
    }

    const user = await newUser.save();
    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "registered successfully", user, token });
  } catch (error) {
    console.log("first");
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        res.status(400).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign(
          {
            name: user.name,
            id: user._id,
          },
          process.env.JWT_KEY,
          { expiresIn: "1m" }
        );
        res
          .status(200)
          .json({ message: "logged in successfully", user, token });
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: message.error });
  }
};
