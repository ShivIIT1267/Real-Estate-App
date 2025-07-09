import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../Components/Contact.jsx";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();

        if (data.success === false) {
          setError(true);
        } else {
          setListing(data);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">Error loading listing.</p>
    );

  return (
    <>
      <div className="w-full">
        <Swiper
          navigation
          className="w-full max-h-[420px] rounded-md overflow-hidden"
        >
          {listing?.imageUrls?.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="w-full h-[400px] bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${url})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col max-w-4xl mx-auto p-4 my-10 gap-6 bg-white rounded-xl shadow-md">
        <p className="text-2xl font-bold text-slate-800">
          {listing.name} – ₹
          {listing.offer
            ? listing.discountPrice.toLocaleString("en-IN")
            : listing.regularPrice.toLocaleString("en-IN")}
          {listing.type === "rent" && " / month"}
        </p>

        <p className="flex items-center gap-2 text-slate-600 text-sm">
          <FaMapMarkerAlt className="text-green-700" />
          {listing.address}
        </p>

        <div className="flex gap-4 flex-wrap">
          <p className="bg-red-700 text-white text-center py-1 px-4 rounded-md text-sm font-medium">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing.offer && (
            <p className="bg-green-700 text-white text-center py-1 px-4 rounded-md text-sm font-medium">
              ₹{+listing.regularPrice - +listing.discountPrice} OFF
            </p>
          )}
        </div>

        <p className="text-slate-700 text-justify">
          <span className="font-semibold text-slate-900">Description: </span>
          {listing.description}
        </p>

        <ul className="text-green-800 font-medium text-sm flex flex-wrap items-center gap-6 mt-2">
          <li className="flex items-center gap-1">
            <FaBed className="text-base" />
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Beds`
              : `${listing.bedrooms} Bed`}
          </li>
          <li className="flex items-center gap-1">
            <FaBath className="text-base" />
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Baths`
              : `${listing.bathrooms} Bath`}
          </li>
          <li className="flex items-center gap-1">
            <FaParking className="text-base" />
            {listing.parking ? "Parking spot" : "No Parking"}
          </li>
          <li className="flex items-center gap-1">
            <FaChair className="text-base" />
            {listing.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>

        {currentUser && listing.userRef !== currentUser._id && !contact && (
          <button
            onClick={() => setContact(true)}
            className="bg-slate-800 text-white rounded-lg uppercase hover:opacity-90 px-6 py-3 font-semibold transition"
          >
            Contact Landlord
          </button>
        )}
        {contact && <Contact listing={listing} />}
      </div>
    </>
  );
}
