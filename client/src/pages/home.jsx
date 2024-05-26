import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listingitem from "../components/listingitem";

export default function Home() {
  const [offerlisting, getOfferlisting] = useState([]);
  const [salelisting, getSalelisting] = useState([]);
  const [rentlisting, getRentlisting] = useState([]);
  console.log(offerlisting);

  useEffect(() => {
    const fecthofferListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        getOfferlisting(data);
        fetchrentListing();
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchrentListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        getRentlisting(data);
        fetchsaleListing();
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchsaleListing = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        getSalelisting(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fecthofferListing();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 py-10 mt-5 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-6xl ">
          Find It! Love It!<br></br>Live It!
        </h1>
        <div className="text-xl">
          HomeLink is the best place to find your next place to live.
          <br></br>
        </div>
        <Link
          to={"/serach"}
          className="text-blue-800 font-bold hover:underline text-xl"
        >
          Let's get started...
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col  gap-8 ">
        {offerlisting && offerlisting.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerlisting.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentlisting && rentlisting.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentlisting.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {salelisting && salelisting.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {salelisting.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
