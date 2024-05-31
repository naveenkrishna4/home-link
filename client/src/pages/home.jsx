import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listingitem from "../components/listingitem";

export default function Home() {
  const [offerlisting, getOfferlisting] = useState([]);
  const [salelisting, getSalelisting] = useState([]);
  const [rentlisting, getRentlisting] = useState([]);

  useEffect(() => {
    const fecthofferListing = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?offer=yes&type=both&parking=both&furnished=both&limit=4`
        );
        const data = await res.json();
        getOfferlisting(data);
        fetchrentListing();
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchrentListing = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?type=rent&parking=both&furnished=both&offer=both&limit=4`
        );
        const data = await res.json();
        getRentlisting(data);
        fetchsaleListing();
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchsaleListing = async () => {
      try {
        const res = await fetch(
          `/api/listing/get?type=sale&parking=both&furnished=both&offer=both&limit=4`
        );
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
      <div className="flex flex-col gap-3 py-10 mt-5 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-6xl ">
          Find It! Love It!<br></br>Live It!
        </h1>
        <div className="text-xl">
          HomeLink is the best place to find your next place to live.
          <br></br>
        </div>
        <div className="text-lg py-5">
          <span className="text-gray-800 mr-2">Developed by -</span>
          <Link
            to={"https://github.com/naveenkrishna4"}
            className="text-blue-600 underline hover:opacity-70"
          >
            Naveen Krishna P M
          </Link>
        </div>
        <Link
          to={
            "/search?searchTerm=&type=both&parking=both&furnished=both&offer=both&sort=created_at&order=desc"
          }
          className="text-blue-900 font-bold hover:underline text-3xl"
        >
          Let's get started...
        </Link>
      </div>
      <div className="mx-14 px-3 flex flex-col gap-8 my-2 ">
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
