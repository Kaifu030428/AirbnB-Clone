import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PropertyCard = ({ property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { id, location, description, dates, price, rating, image } = property;

  return (
    <Link to={`/property/${id}`} className="group flex flex-col gap-3">
      {/* Image Container - Square Aspect, soft corners, elegant shadow */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.2rem] bg-gray-100 ring-1 ring-black/5">
        <motion.img 
          src={image} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt={location}
        />
        
        {/* Heart Overlay */}
        <button 
          onClick={(e) => { e.preventDefault(); setIsLiked(!isLiked); }}
          className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-full transition-transform active:scale-90"
        >
          <span 
            className={`material-symbols-outlined text-[28px] drop-shadow-md transition-colors ${isLiked ? "text-[#FF385C] fill-1" : "text-white/90 hover:text-white"}`}
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Info Section - Focus on White Space & Light Typography */}
      <div className="flex flex-col gap-0.5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-[15px] text-gray-900 leading-tight">
            {location}
          </h3>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
            <span className="text-[14px] font-light text-gray-700">{rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-[15px] font-light leading-tight truncate">
          {description}
        </p>
        <p className="text-gray-500 text-[15px] font-light leading-tight">
          {dates}
        </p>
        
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="font-bold text-[16px] text-gray-900">₹{price.toLocaleString("en-IN")}</span>
          <span className="text-gray-600 text-[15px] font-light">night</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;