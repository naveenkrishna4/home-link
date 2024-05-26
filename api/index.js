import express from "express";
import authRouter from "../api/routes/authRouter.js";
import userRouter from "../api/routes/userRouter.js";
import listingRouter from "../api/routes/listingRouter.js";
import cookieParser from "cookie-parser";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

import connectdb from "./config/dbConnect.js";
connectdb();

const __dirname = path.resolve();

const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
