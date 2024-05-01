import { unstable_next } from "scheduler";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedpw = bcrypt.hashSync(password, 10);
  try {
    await User.create({
      username,
      email,
      password: hashedpw,
    });
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};
