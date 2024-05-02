import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold mt-5 my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="flex items-center round-lg border p-3"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="flex items-center round-lg border p-3"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="flex items-center round-lg border p-3"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="text-white text-center p-3 mt-3 bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80"
          onClick={handleSubmit}
        >
          {loading ? "LOADING..." : "SIGN UP"}
        </button>
      </form>
      <div className="flex mt-2 gap-2">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
