import express from "express";
import { signin, signup, google } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/google", google);
router.post("/signin", signin);

export default router;
