import Listing from "../model/listingModel.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const create = await Listing.create(req.body);
    res.status(200).json(create);
  } catch (err) {
    next(err);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can delete only your listing"));
  }
  try {
    const del = await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json(del);
  } catch (err) {
    next(err);
  }
};
