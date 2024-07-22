import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  updateLike,
  getListings,
} from "../controllers/listingController.js";

const router = express.Router();

router.post("/create", verifyUser, createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);
router.post("/updatelike/:id", updateLike);
router.get("/get/:id", getListing);
router.get("/get", getListings);

export default router;
