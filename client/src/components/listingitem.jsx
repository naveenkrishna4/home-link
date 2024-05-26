import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function Listingitem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`} className="">
        <img
          src={listing.images[0]}
          className="h-[320px]  w-full sm:h-[200px] object-cover hover:scale-105 transition-scale duration-300"
          alt="image"
        ></img>
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate ">
            {listing.name}
          </p>
          <div className=" flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700"></MdLocationOn>
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <div className="line-clamp-2">{listing.description}</div>
          <p>
            Rs {listing.offer ? listing.discountPrice : listing.regularPrice}
            {listing.type === "rent" && " / month"}
          </p>
          <div className="flex gap-4 text-slate-700">
            <div className="font-bold text-xs text-slate-700">
              {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : "1 bed"}
            </div>
            <div className="font-bold text-xs text-slate-700">
              {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 bath"}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
