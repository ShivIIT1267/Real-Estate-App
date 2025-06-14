import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";

export default function Listing() {
  SwiperCore.use([Navigation]);

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    <div className="">
      <Swiper navigation>
        {listing?.imageUrls?.map((url) => (
          <SwiperSlide key={url}>
            <div
              className="h-[550px] bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url(${url})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
