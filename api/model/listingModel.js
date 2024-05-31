import mongoose from "mongoose";

const listingmodel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathRooms: {
      type: Number,
      required: true,
    },
    bedRooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    likedIds: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingmodel);

export default Listing;
