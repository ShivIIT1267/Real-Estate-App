import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden rounded-2xl w-full">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
        />

        <div className="p-4">
          <p className="truncate text-lg font-bold text-slate-800">
            {listing.name}
          </p>

          <div className="flex items-center gap-1 mt-1 mb-2 text-sm text-gray-600">
            <MdLocationOn className="text-green-700" />
            <span className="truncate">{listing.address}</span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {listing.description}
          </p>

          <p className="text-blue-600 font-semibold text-md">
            ₹
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN")}
            {listing.type === "rent" && " / month"}
          </p>

          <div className="text-gray-700 flex justify-between text-sm mt-3">
            <span>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Beds`
                : `${listing.bedrooms} Bed`}
            </span>
            <span>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : `${listing.bathrooms} Bathroom`}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
