// imports
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase.js";

export default function CreateListing() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [files, setFiles] = useState([]);
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  useEffect(() => {}, [formData]);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length < 7) {
      setUploading(true);
      setError(false);
      const promises = files.map((file) => storeImage(file));
      Promise.all(promises)
        .then((urls) => {
          setFormData((prevData) => ({
            ...prevData,
            imageUrls: [...prevData.imageUrls, ...urls],
          }));
          setUploading(false);
        })
        .catch((err) => {
          setError("Image upload failed.");
          setUploading(false);
        });
    } else {
      setError("You must upload 1–6 images.");
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    if (id === "sell" || id === "rent") {
      setFormData({ ...formData, type: id });
    }
    if (id === "parking" || id === "furnished" || id === "offer") {
      setFormData({ ...formData, [id]: checked });
    }
    if (type === "number" || type === "text" || type === "textarea") {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleImageDelete = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (+formData.regularPrice < +formData.discountPrice) {
        setError(
          "Regular price must be greater than or equal to discount price."
        );
        return;
      }

      setUploading(true);
      setError(false);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });

      const data = await res.json();
      setUploading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }

      Navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setUploading(false);
    }
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-10 text-slate-800">
        Create a Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-10"
      >
        {/* Left Section */}
        <div className="flex flex-col gap-6 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-md shadow-sm"
            id="name"
            maxLength="62"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border border-gray-300 p-3 rounded-md shadow-sm"
            required
            id="description"
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 p-3 rounded-md shadow-sm"
            required
            id="address"
            onChange={handleChange}
            value={formData.address}
          />
          {/* Type and Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                id="sell"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.type === "sell"}
              />
              <span className="text-slate-700 font-medium">Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                id="rent"
                className="w-5 h-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span className="text-slate-700 font-medium">Rent</span>
            </div>
            {["parking", "furnished", "offer"].map((item) => (
              <div className="flex items-center gap-2" key={item}>
                <input
                  type="checkbox"
                  id={item}
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData[item]}
                />
                <span className="text-slate-700 font-medium capitalize">
                  {item}
                </span>
              </div>
            ))}
          </div>
          {/* Bedroom/Bathroom Inputs */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-md w-20"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p className="text-sm text-slate-700">Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-md w-20"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p className="text-sm text-slate-700">Baths</p>
            </div>
          </div>
          {/* Pricing */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-md w-32"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="text-sm text-gray-600">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="1000000"
                  required
                  className="p-3 border border-gray-300 rounded-md w-32"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="text-sm text-gray-600">
                  <p>Discount Price</p>
                  <span className="text-xs">($ / month)</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <p className="font-semibold text-slate-700 mb-1">
              Images:
              <span className="font-normal text-sm text-gray-500 ml-1">
                (First image is cover, max 6)
              </span>
            </p>
            <input
              onChange={(e) => {
                setFiles(Array.from(e.target.files));
              }}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              className="mt-2 p-3 border border-red-500 text-red-600 rounded-md uppercase hover:shadow transition"
            >
              Upload
            </button>
          </div>

          {/* Image Previews with delete button */}
          {formData.imageUrls.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {formData.imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt="listing"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="p-3 bg-slate-800 text-white rounded-lg uppercase hover:opacity-90 transition disabled:opacity-70"
          >
            {uploading ? "Uploading..." : "Create Listing"}
          </button>

          {error && (
            <p className="text-red-600 text-center font-medium">
              Error: {error}
            </p>
          )}
        </div>
      </form>
    </main>
  );
}
