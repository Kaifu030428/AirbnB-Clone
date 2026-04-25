import React from "react";
import { motion } from "framer-motion";

const ImageGallery = ({ images = [] }) => {
  // Demo images agar prop khali ho
  const galleryImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600607687940-c52af04657b3?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="relative group">
      {/* 1. Desktop Grid View (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[450px] rounded-2xl overflow-hidden">
        {/* Main Large Image */}
        <div className="col-span-2 row-span-2 overflow-hidden relative">
          <img 
            src={galleryImages[0]} 
            className="w-full h-full object-cover hover:brightness-90 transition-all duration-500 cursor-pointer"
            alt="Main property"
          />
        </div>

        {/* Smaller Images */}
        {galleryImages.slice(1, 5).map((img, idx) => (
          <div key={idx} className="overflow-hidden relative">
            <img 
              src={img} 
              className="w-full h-full object-cover hover:brightness-90 transition-all duration-500 cursor-pointer"
              alt={`Property view ${idx + 1}`}
            />
          </div>
        ))}
      </div>

      {/* 2. Mobile Carousel View (Visible on Mobile Only) */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory no-scrollbar h-[250px] rounded-xl">
        {galleryImages.map((img, idx) => (
          <div key={idx} className="min-w-full h-full snap-start">
            <img src={img} className="w-full h-full object-cover" alt="Property view mobile" />
          </div>
        ))}
      </div>

      {/* 3. Show All Photos Button */}
      <button className="absolute bottom-6 right-6 bg-white border border-black px-4 py-2 rounded-lg font-semibold text-sm shadow-md hover:bg-gray-50 transition active:scale-95 flex items-center gap-2 z-10">
        <span className="material-symbols-outlined text-[18px]">grid_view</span>
        Show all photos
      </button>

      {/* 4. Floating Interaction Icons (Mobile Only) */}
      <div className="absolute top-4 right-4 flex gap-3 md:hidden">
        <button className="bg-white p-2 rounded-full shadow-md active:scale-90">
          <span className="material-symbols-outlined text-[20px]">share</span>
        </button>
        <button className="bg-white p-2 rounded-full shadow-md active:scale-90">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;