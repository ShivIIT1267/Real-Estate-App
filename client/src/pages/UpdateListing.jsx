import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandler } from "../../../api/utils/error";

export default function UpdateListing() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const Navigate = useNavigate();
  const params = useParams();

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
    userRef: currentUser._id,
  });

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();

      if (data.success === false) {
        errorHandler(404, "Something went wrong while fetching the listing");
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, [params.listingId]);

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
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
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
        Update a Listing
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

          <div className="flex flex-wrap gap-6">
            {["sell", "rent"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 text-slate-700 font-medium"
              >
                <input
                  type="radio"
                  name="type"
                  id={type}
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData.type === type}
                />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </label>
            ))}
            {["parking", "furnished", "offer"].map((field) => (
              <label
                key={field}
                className="flex items-center gap-2 text-slate-700 font-medium"
              >
                <input
                  type="checkbox"
                  id={field}
                  className="w-5 h-5"
                  onChange={handleChange}
                  checked={formData[field]}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>

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
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              className="mt-2 p-3 border border-red-500 text-red-600 rounded-md uppercase hover:shadow transition"
            >
              Upload
            </button>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="p-3 bg-slate-800 text-white rounded-lg uppercase hover:opacity-90 transition disabled:opacity-70"
          >
            {uploading ? "Creating..." : "Update Listing"}
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
