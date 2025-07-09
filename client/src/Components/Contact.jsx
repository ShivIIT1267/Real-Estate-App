import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await fetch(`/api/user/${listing.userRef}`);
        const data = await response.json();
        setLandLord(data);
      } catch (error) {
        console.error("Error fetching landlord data:", error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-4 mt-4">
          <p className="text-slate-700">
            Contact{" "}
            <span className="font-semibold text-black">
              {landlord.username}
            </span>{" "}
            for{" "}
            <span className="font-semibold text-black">
              {listing.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Your message for the landlord..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 text-sm border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 resize-none shadow-sm"
          ></textarea>
          {message.trim() !== "" && (
            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              className="w-fit px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </Link>
          )}
        </div>
      )}
    </>
  );
}
