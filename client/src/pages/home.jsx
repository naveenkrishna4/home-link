import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [offerlisting, getOfferlisting] = useState([]);
  const [salelisting, getSalelisting] = useState([]);
  const [rentlisting, getRentListing] = useState([]);

  useEffect(() => {
    const fecthofferListing = async () => {};
    try {
    } catch (err) {
      console.log(err.message);
    }
    fecthofferListing();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
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
    </div>
  );
}
