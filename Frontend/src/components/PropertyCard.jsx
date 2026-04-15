import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const {
    id = 1,
    location = "North Goa, India",
    description = "Mountain and pool views",
    dates = "15-20 Oct",
    price = 10000,
    rating = 4.8,
    image = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  } = property ?? {};

  return (
    <Link
      to={`/property/${id}`}
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb rounded-2xl"
      aria-label={`View details for ${location}`}
    >
      <div className="flex flex-col cursor-pointer transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl mb-3">
          <img
            src={image}
            alt={location}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 text-white hover:scale-110 transition drop-shadow-md">
            <span className="material-symbols-outlined font-normal text-[26px] fill-black/30 w-[24px]">favorite</span>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-[15px] text-gray-900 leading-tight">{location}</h3>
            <p className="text-gray-500 text-[15px] leading-tight mt-1">{description}</p>
            <p className="text-gray-500 text-[15px] leading-tight">{dates}</p>
            <div className="mt-2 flex items-center gap-1">
              <span className="font-semibold text-[15px] text-gray-900">
                ₹{price.toLocaleString("en-IN")}
              </span>
              <span className="text-gray-600 text-[15px]">night</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-[15px]" aria-label={`Rated ${rating} stars`}>
            <span className="material-symbols-outlined text-sm font-bold">star</span>
            <span>{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;