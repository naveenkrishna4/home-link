import express from "express";
import {
  updateUser,
  deleteUser,
  showListings,
  getUser,
} from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/update/:id", verifyUser, updateUser);
router.delete("/delete/:id", verifyUser, deleteUser);
router.get("/listings/:id", verifyUser, showListings);
router.get("/:id", verifyUser, getUser);

export default router;
