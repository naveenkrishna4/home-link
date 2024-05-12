import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function createListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    images: [],
    name: "",
    description: "",
    type: "rent",
    furnished: false,
    address: "",
    bedRooms: 1,
    bathRooms: 1,
    regularPrice: 500,
    discountPrice: 500,
    offer: false,
    parking: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.images.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({ ...formData, images: formData.images.concat(urls) });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed ");
          setUploading(false);
        });
    } else {
      setImageUploadError("No of images should be between 1-6");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDelete = (index) => {
    const updatedImages = formData.images.filter((url, i) => i !== index);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "offer" ||
      e.target.id === "furnished"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1) return setError("Upload atleast 1 image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price should be lower than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      } else {
        setLoading(false);
        navigate(`/listing/${data._id}`);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-10"
      >
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Name"
            id="name"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            value={formData.name}
            required
          ></input>
          <textarea
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Description"
            id="description"
            onChange={handleChange}
            value={formData.description}
            required
          ></textarea>
          <input
            type="text"
            className="rounded-lg mt-5 border p-3"
            placeholder="Address"
            id="address"
            onChange={handleChange}
            value={formData.address}
            required
          ></input>
          <div className="flex gap-6 flex-wrap flex-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="sale"
                onChange={handleChange}
                checked={formData.type === "sale"}
              ></input>
              <span className="text-1xl">Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="rent"
                onChange={handleChange}
                checked={formData.type === "rent"}
              ></input>
              <span className="text-1xl">Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="parking"
                onChange={handleChange}
                checked={formData.parking === true}
              ></input>
              <span className="text-1xl">Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="offer"
                onChange={handleChange}
                checked={formData.offer === true}
              ></input>
              <span className="text-1xl">Offer</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                className="w-5"
                id="furnished"
                onChange={handleChange}
                checked={formData.furnished === true}
              ></input>
              <span className="text-1xl">Furnished</span>
            </div>
          </div>
          <div className="flex gap-10 flex-wrap flex-between">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bedRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg "
                onChange={handleChange}
                value={formData.bedRooms}
              ></input>
              <span>Bedrooms</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="bathRooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathRooms}
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <span>Bathrooms</span>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                id="regularPrice"
                min="500"
                max="10000000"
                onChange={handleChange}
                value={formData.regularPrice}
                required
                className="p-3 border border-gray-300 rounded-lg "
              ></input>
              <div className="flex flex-col items-center">
                <span>Regular price </span>
                <span className="text-xs">(Rs / month)</span>
              </div>
            </div>
            <div className="flex gap-4 items-center ">
              {formData.offer && (
                <div>
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="10000000"
                    onChange={handleChange}
                    value={formData.discountPrice}
                    required
                    className="p-3 border border-gray-300 rounded-lg "
                  ></input>
                  <div className="flex flex-col items-center">
                    <span>Discount price</span>
                    <span className="text-xs">(Rs / month)</span>
                  </div>
                </div>
              )}
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
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              className=" p-3 border w-full border-gray-300 rounded-lg"
              id="images"
              accept="image/*"
              multiple
            ></input>
            <button
              type="button"
              disabled={uploading}
              onClick={() => {
                handleImageUpload();
              }}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
            >
              {uploading ? "uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.images.length > 0 &&
            formData.images.map((url, index) => (
              <div className="border items-center flex justify-between p-3 ">
                <img
                  key={url}
                  src={url}
                  alt="image"
                  className="w-20 h-20 object-contain rounded-lg "
                />
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(index);
                  }}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-70"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            disabled={loading || uploading}
            className="uppercase text-white hover:opacity-90 disabled:opacity-80 bg-slate-700 p-3 rounded-lg "
          >
            {loading ? "Creating" : "Create Listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}
