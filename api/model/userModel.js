import mongoose from "mongoose";

const usermodel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usermodel);

export default User;
