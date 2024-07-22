import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Contact from "../components/contact";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [contact, setContact] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        if (data.likedIds.includes(currentUser._id)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId, currentUser]);

  const handleLike = async () => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedListing = { ...listing };
      updatedListing.likes = liked
        ? updatedListing.likes - 1
        : updatedListing.likes + 1;
      if (!liked) {
        updatedListing.likedIds.push(currentUser._id);
      } else {
        updatedListing.likedIds = updatedListing.likedIds.filter(
          (id) => id !== currentUser._id
        );
      }
      setLiked(!liked);
      const res = await fetch(`/api/listing/updateLike/${params.listingId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedListing),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(true);
      } else {
        setListing(data);
      }
      setLoading(false);
      setError(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong</p>
      )}
      {listing && !error && !loading && (
        <div>
          <div className="flex flex-wrap justify-center mt-5">
            {listing.images?.map((url, index) => (
              <img
                src={url}
                className=" w-1/3 m-3 mt-3"
                alt={`Listing ${index}`}
                key={url}
              />
            ))}
          </div>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 5000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} {"- Rs "}
              {listing.offer ? listing.discountPrice : listing.regularPrice}
              {listing.type === "rent" && " / month"}
            </p>

            <p className="flex items-center mt-3 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  Rs {+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            <p className="font-semibold">Likes - {listing.likes}</p>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <div className="flex flex-wrap gap-5 mt-3">
                <button
                  onClick={handleLike}
                  className="border rounded-lg p-3 uppercase bg-gray-400 hover:opacity-80 "
                >
                  {liked ? "Dislike" : "Like"}
                </button>
                <br></br>
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-80 "
                >
                  I'm Interested
                </button>
              </div>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
