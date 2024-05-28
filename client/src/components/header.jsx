import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);
    url.set("searchTerm", searchTerm);
    navigate(`/search?${url.toString()}`);
  };

  useEffect(() => {
    const url = new URLSearchParams(location.search);
    const searchTermForUrl = url.get("searchTerm");
    setSearchTerm(searchTermForUrl);
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-700">Home</span>
            <span className="text-slate-500">Link</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none sm:w-80"
          ></input>
          <button>
            <FaSearch className="text-slate-600"></FaSearch>
          </button>
        </form>
        <ul className="font-bold flex gap-8 text-slate-600">
          <Link to="/">
            <li className="hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                alt=""
                src={currentUser.avatar}
                className="rounded-full h-9 w-9 object-cover"
              ></img>
            ) : (
              <li className="hover:underline">SignIn</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
