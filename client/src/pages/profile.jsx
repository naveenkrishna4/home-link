import React from "react";
import { createDispatchHook, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signoutFailure,
  signoutSuccess,
  signoutStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//firebase storage
//rules_version = '2';
// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
//service firebase.storage {
//  match /b/{bucket}/o {
//    match /{allPaths=**} {
//      allow read;
//      allow write : if
//      request.resource.size < 2*1024*1024 &&
//      request.resource.contentType.matches('image/.*')
//    }
//  }
//}

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSucess] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingErr, setShowListingErr] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state-changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFilePercentage(progress);
      },
      (error) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSucess(true);
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignout = async () => {
    try {
      dispatch(signoutStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutFailure(data.message));
        return;
      }
      dispatch(signoutSuccess(data));
    } catch (err) {
      dispatch(signoutFailure(err.message));
    }
  };

  const handleShowLisitings = async () => {
    try {
      setShowListingErr(false);
      const res = await fetch(`api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingErr(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingErr(true);
    }
  };

  useEffect(() => {
    console.log(userListings);
  }, [userListings]);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          value={currentUser.avatar}
          onChange={handleChange}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        ></img>
        <p className="text-sm self-center">
          {fileUploadErr ? (
            <span className="text-red-700">
              Error Image Uplaod , size must be less than 2MB
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">Uplaoding {filePercentage}%</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          id="username"
          value={currentUser.username}
          onChange={handleChange}
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="flex items-center round-lg border p-3"
        ></input>
        <button
          diasbled={error}
          type="submit"
          className="text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700"
        >
          {loading ? "loading..." : "update"}
        </button>
        <Link
          to={"/createListing"}
          diasbled={error}
          className="text-white p-3 rounded-lg uppercase text-center hover:opacity-95 disabled:opacity-80 bg-green-700"
        >
          create listing
        </Link>
      </form>
      <div className="flex justify-between mt-4">
        <span onClick={handleDelete} className="cursor-pointer text-red-500">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer text-red-500">
          Signout
        </span>
      </div>
      <p className="mt-5 text-red-700">{error ? error : ""}</p>
      <p className="mt-5 text-green-700">
        {updateSuccess ? "User updated successfully!" : ""}
      </p>
      <button onClick={handleShowLisitings} className="text-green-700 w-full ">
        Show Listings
      </button>
      <p>{showListingErr ? "Error showing listings" : ""}</p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7  text-2xl text-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border mt-5 p-3 border-black rounded-lg flex gap-4 items-center justify-between"
            >
              <Link
                className="flex items-center gap-5 text-slate-700 hover:underline font-semibold truncate"
                to={`/listing/${listing._id}`}
              >
                <img
                  src={listing.images[0]}
                  className="h-16 w-16 object-contain"
                  alt="image"
                ></img>
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col gap-3 mt-2 items-center ">
                <button className="p-1 border-black text-green-700 uppercase  border">
                  Edit
                </button>
                <button className="p-1 border-black  text-red-700 uppercase border">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
