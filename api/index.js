import express from "express";
import authRouter from "../api/routes/authRouter.js";

import dotenv from "dotenv";
dotenv.config();

import connectdb from "./config/dbConnect.js";
connectdb();
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use(express.json());
app.use("/api/auth", authRouter);
