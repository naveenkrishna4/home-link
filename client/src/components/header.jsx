import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-700">Home</span>
            <span className="text-slate-500">Link</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search.."
            className="bg-transparent focus:outline-none sm:w-80"
          ></input>
          <button>
            <FaSearch className="text-slate-600"></FaSearch>
          </button>
        </form>
        <ul className="font-bold flex gap-8 text-slate-600">
          <Link to="/signin">
            <li className="hover:underline">Signin</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline">About</li>
          </Link>
          <Link to="/profile">
            <li className="hover:underline">Profile</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
