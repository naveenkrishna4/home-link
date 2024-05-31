import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listingitem from "../components/listingitem";

export default function search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showmore, setShowmore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "both",
    parking: "both",
    furnished: "both",
    offer: "both",
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
        type:
          typeFromUrl === "both"
            ? "both"
            : typeFromUrl === "rent"
            ? "rent"
            : "sale",
        parking:
          parkingFromUrl === "both"
            ? "both"
            : parkingFromUrl === "yes"
            ? "yes"
            : "no",
        furnished:
          furnishedFromUrl === "both"
            ? "both"
            : furnishedFromUrl === "yes"
            ? "yes"
            : "no",
        offer:
          offerFromUrl === "both"
            ? "both"
            : offerFromUrl === "yes"
            ? "yes"
            : "no",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });

      const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length > 8) {
          setShowmore(true);
        } else {
          setShowmore(false);
        }
        setListings(data);
        setLoading(false);
      };
      fetchListings();
    }
  }, [location.search]);

  const handleChange = async (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.name === "parking" ||
      e.target.name === "furnished" ||
      e.target.name === "offer" ||
      e.target.name === "type"
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.name]: e.target.id,
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

  const onShowmoreClick = async () => {
    const num = listings.length;
    const urlParams = new URLSearchParams(location.search);
    const startIndex = num;
    urlParams.set("start", startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowmore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen w-2/3">
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
                type="radio"
                id="both"
                name="type"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "both"}
              ></input>
              <span className="">Both</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Offer:</label>
            <div className="flex gap-1">
              <input
                type="radio"
                id="yes"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer === "yes"}
              ></input>
              <span className="">Yes </span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="no"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer === "no"}
              ></input>
              <span className="">No</span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="both"
                name="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer === "both"}
              ></input>
              <span className="">Both</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Parking:</label>
            <div className="flex gap-1">
              <input
                type="radio"
                id="yes"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking === "yes"}
              ></input>
              <span className="">Yes </span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="no"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking === "no"}
              ></input>
              <span className="">No</span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="both"
                name="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking === "both"}
              ></input>
              <span className="">Both</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Furnished:</label>
            <div className="flex gap-1">
              <input
                type="radio"
                id="yes"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished === "yes"}
              ></input>
              <span className="">Yes</span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="no"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished === "no"}
              ></input>
              <span className="">No</span>
            </div>
            <div className="flex gap-1">
              <input
                type="radio"
                id="both"
                name="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished === "both"}
              ></input>
              <span className="">Both</span>
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
        <h1 className="flex font-semibold p-6 border-b-2 text-slate-700 text-3xl items-center ">
          Listing Reults:
        </h1>
        <div className="flex flex-wrap gap-8 p-6 items-center">
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
          {showmore && (
            <button
              onClick={onShowmoreClick}
              className=" text-green-700 hover:underline text-lg w-full"
            >
              Showmore
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
