import React from "react";

export default function search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term : </label>
            <input
              type="text"
              className="border w-full p-3 rounded-lg "
              id="searchTerm"
              placeholder="Search..."
            ></input>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-1">
              <input type="checkbox" id="all" className="w-5"></input>
              <span className="">Rent & Sale</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="red" className="w-5"></input>
              <span className="">Rent </span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="sale" className="w-5"></input>
              <span className="">Sale</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="offer" className="w-5"></input>
              <span className="">Offer</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Ammenities:</label>
            <div className="flex gap-1">
              <input type="checkbox" id="parking" className="w-5"></input>
              <span className="">Parking</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="furnished" className="w-5"></input>
              <span className="">Furnished</span>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap items-center">
            <label>Sort:</label>
            <select id="sort_order" className="border rounded-lg p-2">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
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
      </div>
    </div>
  );
}
