import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectdb from "./dbConnect.js";
connectdb();
const app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
