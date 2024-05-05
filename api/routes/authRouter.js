import express from "express";
import {
  signin,
  signup,
  google,
  signout,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", google);
router.post("/signin", signin);
router.get("/signout", signout);

export default router;
