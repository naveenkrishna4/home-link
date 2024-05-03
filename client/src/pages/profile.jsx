import React from "react";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

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
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
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
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="text"
          placeholder="email"
          id="email"
          className="flex items-center round-lg border p-3"
        ></input>
        <input
          type="text"
          placeholder="password"
          id="password"
          className="flex items-center round-lg border p-3"
        ></input>
        <button className="text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-4">
        <span className="cursor-pointer text-red-500">Delete Account</span>
        <span className="cursor-pointer text-red-500">Signout</span>
      </div>
    </div>
  );
}
