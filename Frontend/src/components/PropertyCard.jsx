import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = () => {
  return (
    <Link to="/property/1">
      <div className="w-64 cursor-pointer">
        <img
          src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
          className="rounded-xl h-40 w-full object-cover"
        />

        <div className="mt-2">
          <h3 className="font-semibold">Home in Goa</h3>
          <p className="text-gray-500 text-sm">₹10,000 for 2 nights</p>
          <p className="text-sm">⭐ 4.8</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;