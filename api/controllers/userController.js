import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import User from "../model/userModel.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "User not authenticated"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = update._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id != req.params.id)
    return next(errorHandler(401, "User not authenticated"));
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (del) {
      res.clearCookie().status(200).json("User deleted successfully");
    }
  } catch (err) {
    next(err);
  }
};
