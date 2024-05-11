import React from "react";

export default function createListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-10">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            required
          ></input>
          <textarea
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Description"
            id="description"
            required
          ></textarea>
          <input
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Address"
            id="address"
            required
          ></input>
          <div className="flex gap-6 flex-wrap flex-between">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale"></input>
              <span className="text-1xl">Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent"></input>
              <span className="text-1xl">Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking"></input>
              <span className="text-1xl">Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer"></input>
              <span className="text-1xl">Offer</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished"></input>
              <span className="text-1xl">Furnished</span>
            </div>
          </div>
          <div className="flex gap-6 flex-wrap flex-between">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <span>Bedrooms</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <span>Bathrooms</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <div className="flex flex-col items-center">
                <span>Regular price </span>
                <span className="text-xs">(Rs / month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <div className="flex flex-col items-center">
                <span>Discount price</span>
                <span className="text-xs">(Rs / month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1 ">
          <div className="flex mt-4">
            <p className="font-semibold">Images:</p>
            <span className="font-normal text-gray-700 ml-2">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex gap-4">
            <input
              type="file"
              className=" p-3 border w-full border-gray-300 rounded-lg"
              id="images"
              accept="image/*"
              multiple
            ></input>
            <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
              Upload
            </button>
          </div>
          <button className="uppercase text-white hover:opacity-90 disabled:opacity-80 bg-slate-700 p-3 rounded-lg ">
            Create Lsiting
          </button>
        </div>
      </form>
    </main>
  );
}
