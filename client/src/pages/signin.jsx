import React from "react";

export default function SignIn() {
  return (
    <div>
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
    </div>
  );
}
