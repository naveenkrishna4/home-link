import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

export default function Oauth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const res = await signInWithPopup(auth, provider);
      const result = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: res.user.displayName,
          email: res.user.email,
          photo: res.user.photoURL,
        }),
      });
      const data = await result.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in", error);
    }
  };
  return (
    <button
      type="button"
      className="rounded-lg hover:opacity-95 bg-red-700 text-white p-3"
      onClick={handleGoogleClick}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
