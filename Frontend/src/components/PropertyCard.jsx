import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const PropertyCard = ({ property, isWishlistedInitial = false }) => {
  const [isLiked, setIsLiked] = useState(isWishlistedInitial);
  const { _id, id, location, description, dates, price, rating, image } = property;

  const toggleWishlist = async (e) => {
    e.preventDefault();
    const previousState = isLiked;
    setIsLiked(!isLiked); // Optimistic UI update

    try {
      const res = await axios.post(`http://localhost:8000/api/auth/wishlist/${_id || id}`, {}, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      setIsLiked(previousState); // Revert if failed
      toast.error(error.response?.data?.message || "Please login to save to wishlist");
    }
  };

  return (
    <Link to={`/property/${_id || id}`} className="group flex flex-col gap-4">
      {/* Image Container - Square Aspect, soft corners, elegant shadow */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#111] shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
        <motion.img 
          src={image} 
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
          }}
          className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
          alt={location}
        />
        
        {/* Heart Overlay */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 transition-all active:scale-90 border border-white/10"
        >
          <span 
            className={`material-symbols-outlined text-[24px] transition-colors ${isLiked ? "text-[#D4AF37] fill-1 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" : "text-white/90 hover:text-white"}`}
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info Section - Focus on Luxury Typography */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between items-center">
          <h3 className="font-serif font-bold text-[17px] text-white leading-tight tracking-wide">
            {location}
          </h3>
          <div className="flex items-center gap-1.5 bg-[#111] px-2 py-1 rounded-md border border-[#222]">
            <span className="material-symbols-outlined text-[14px] fill-1 text-[#D4AF37]">star</span>
            <span className="text-[13px] font-bold text-gray-200">{rating}</span>
          </div>
        </div>
        
        <p className="text-gray-400 text-[14px] font-light leading-snug line-clamp-1 mt-1">
          {description}
        </p>
        <p className="text-gray-500 text-[13px] font-light tracking-wide uppercase mt-0.5">
          {dates || "Available Now"}
        </p>
        
        <div className="mt-3 flex items-center gap-1.5 border-t border-[#222] pt-3">
          <span className="font-bold text-[18px] text-[#D4AF37]">₹{price.toLocaleString("en-IN")}</span>
          <span className="text-gray-500 text-[14px] font-light">/ night</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;