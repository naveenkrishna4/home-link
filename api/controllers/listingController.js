import express from "express";
import Listing from "../model/listingModel.js";

export const createListing = async (req, res, next) => {
  try {
    const create = await Listing.create(req.body);
    res.status(200).json(create);
  } catch (err) {
    next(err);
  }
};
