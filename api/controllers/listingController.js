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

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can edit only your listing"));
  }
  try {
    const up = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(up);
  } catch (err) {
    next(err);
  }
};

export const updateLike = async (req, res, next) => {
  try {
    // Find the listing by ID
    const listing = await Listing.findById(req.params.id);

    // If listing is not found, return a 404 error
    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }

    // Update the listing with the request body data
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Send the updated listing in the response
    res.status(200).json(updatedListing);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating like:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (err) {
    next(err);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const start = parseInt(req.query.start) || 0;
    const offer = req.query.offer
      ? req.query.offer === "true"
      : { $in: [true, false] };
    const furnished = req.query.furnished
      ? req.query.furnished === "true"
      : { $in: [true, false] };
    const parking = req.query.parking
      ? req.query.parking === "true"
      : { $in: [true, false] };
    const type =
      req.query.type && req.query.type !== "all"
        ? req.query.type
        : { $in: ["rent", "sale"] };
    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(start);
    return res.status(200).json(listings);
  } catch (err) {
    next(err);
  }
};
