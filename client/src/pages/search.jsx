import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listingitem from "../components/listingitem";

export default function search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });

      const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings(data);
        setLoading(false);
      };
      fetchListings();
    }
  }, [location.search]);

  const handleChange = async (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebardata({ ...sidebardata, sort: sort, order: order });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = new URLSearchParams();
    url.set("searchTerm", sidebardata.searchTerm);
    url.set("type", sidebardata.type);
    url.set("parking", sidebardata.parking);
    url.set("furnished", sidebardata.furnished);
    url.set("offer", sidebardata.offer);
    url.set("sort", sidebardata.sort);
    url.set("order", sidebardata.order);
    navigate(`/search?${url.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term : </label>
            <input
              type="text"
              className="border w-full p-3 rounded-lg "
              id="searchTerm"
              placeholder="Search..."
              value={sidebardata.searchTerm}
              onChange={handleChange}
            ></input>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-1">
              <input
                type="radio"
                id="all"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              ></input>
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="rent"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              ></input>
              <span className="">Rent </span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="sale"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              ></input>
              <span className="">Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              ></input>
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Ammenities:</label>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              ></input>
              <span className="">Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              ></input>
              <span className="">Furnished</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Sort:</label>
            <select
              onChange={handleChange}
              id="sort_order"
              className="border rounded-lg p-2"
              default={"createdAt_desc"}
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="text-white uppercase bg-slate-700 p-2 rounded-lg hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="flex font-semibold p-3 border-b text-slate-700 text-3xl items-center mt-5 ">
          Listing Reults:
        </h1>
        <div className="flex flex-wrap gap-8 p-7 items-center">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => (
              <Listingitem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
