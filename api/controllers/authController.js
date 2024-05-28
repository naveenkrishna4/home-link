import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const valid = await bcrypt.compareSync(password, validUser.password);
    if (!valid) {
      return next(errorHandler(401, "Wrong credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600 * 5,
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedpw = bcrypt.hashSync(generatedPassword, 10);
      const user = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedpw,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken").status(200).json("Signed out successfully");
  } catch (err) {
    next(err);
  }
};
