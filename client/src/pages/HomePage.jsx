import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../Components/ListingItem.jsx";

SwiperCore.use([Navigation]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div className="bg-white text-slate-800">
      {/* Hero Section */}
      <div className="flex flex-col gap-6 px-4 py-24 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
          Find your next <span className="text-blue-600">perfect</span>
          <br />
          place with ease
        </h1>
        <p className="text-gray-500 text-lg sm:text-xl">
          Sahand Estate is your go-to platform for finding your dream property.
          <br />
          Explore a wide range of listings tailored to your needs.
        </p>
        <Link
          to="/search"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-sm sm:text-base font-semibold shadow-md hover:bg-blue-700 transition"
        >
          Let’s get started →
        </Link>
      </div>

      {/* Swiper Section */}
      <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden shadow-lg">
        <Swiper navigation loop className="h-[500px]">
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  className="w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${listing.imageUrls[0]})`,
                  }}
                >
                  <div className="w-full h-full bg-black/40 flex items-end p-6 text-white text-xl font-semibold">
                    {listing.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Listings Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col gap-12">
        {/* Offers */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-slate-700">
                Recent Offers
              </h2>
              <Link
                to="/search?offer=true"
                className="text-blue-600 text-sm hover:underline"
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* Rent */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-slate-700">
                Recent Rentals
              </h2>
              <Link
                to="/search?type=rent"
                className="text-blue-600 text-sm hover:underline"
              >
                Show more rentals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}

        {/* Sale */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-slate-700">
                Recent Sales
              </h2>
              <Link
                to="/search?type=sale"
                className="text-blue-600 text-sm hover:underline"
              >
                Show more for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleListings.map((listing) => (
                <ListingItem key={listing._id} listing={listing} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
