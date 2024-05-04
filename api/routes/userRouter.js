import express from "express";
import { updateUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);

export default router;
