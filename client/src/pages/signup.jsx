import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-center text-3xl font-bold mt-5 my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="email"
          placeholder="email"
          id="email"
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          className="flex items-center round-lg border p-3"
        ></input>
        <butto className="text-white text-center p-3 mt-3 bg-slate-700 rounded-lg hover:opacity-95 disabled:opacity-80">
          SIGN UP
        </butto>
      </form>
      <div className="flex mt-2 gap-2">
        <p>Have an account?</p>
        <Link to="/signin">
          <span className="text-blue-700 ">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
