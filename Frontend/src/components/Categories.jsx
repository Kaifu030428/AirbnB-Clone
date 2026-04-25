import React from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { label: "Amazing pools", icon: "pool" },
  { label: "Icons", icon: "stars" },
  { label: "Beachfront", icon: "waves" },
  { label: "Cabins", icon: "cabin" },
  { label: "OMG!", icon: "rocket_launch" },
  { label: "Earth homes", icon: "home_work" },
  { label: "Farms", icon: "agriculture" },
  { label: "Treehouses", icon: "park" },
  { label: "Mansions", icon: "castle" },
  { label: "Lakefront", icon: "water" },
  { label: "Countryside", icon: "landscape" },
  { label: "Camping", icon: "camping" },
  { label: "Amazing views", icon: "visibility" },
  { label: "Castles", icon: "fort" },
];

const Categories = () => {
  // 1. useState ko hata kar URL Params use kar rahe hain
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  // 2. Logic: Agar same category click ki toh deselect (clear), nahi toh set karo
  const handleCategoryClick = (label) => {
    const nextParams = new URLSearchParams(searchParams);
    if (activeCategory === label) {
      nextParams.delete("category"); 
    } else {
      nextParams.set("category", label);
    }
    setSearchParams(nextParams);
  };

  return (
    <div className="flex items-center w-full bg-white px-6 md:px-16 pt-3 pb-0">
      
      {/* Scrollable Container */}
      <div className="flex items-center gap-8 md:gap-10 overflow-x-auto no-scrollbar flex-1 pb-4 pr-10">
        {categories.map((item) => {
          // Check if current item matches the URL param
          const isActive = activeCategory === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => handleCategoryClick(item.label)}
              className={`relative flex flex-col items-center min-w-max gap-2 cursor-pointer transition-all duration-300 group ${
                isActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              <motion.span 
                whileTap={{ scale: 0.9 }}
                className={`material-symbols-outlined text-[24px] ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
              >
                {item.icon}
              </motion.span>
              
              <p className={`text-[12px] font-medium tracking-tight ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </p>

              {/* Animated Underline (Aapka original mast animation) */}
              {isActive ? (
                <motion.div
                  layoutId="categoryUnderline"
                  className="absolute -bottom-[16px] left-0 right-0 h-[2px] bg-black"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              ) : (
                <div className="absolute -bottom-[16px] left-0 right-0 h-[2px] bg-transparent group-hover:bg-gray-200 transition-colors" />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Side Controls (Filters & Display) */}
      <div className="hidden lg:flex items-center gap-3 ml-4 pb-4">
        <button className="flex items-center gap-2 border border-gray-300 px-4 py-[10px] rounded-xl hover:border-black hover:bg-gray-50 transition-all duration-200 shadow-sm active:scale-95">
          <span className="material-symbols-outlined text-[18px]">tune</span>
          <span className="text-xs font-semibold">Filters</span>
        </button>

        {/* Display Total Toggle */}
        <div className="flex items-center gap-3 border border-gray-300 px-4 py-[10px] rounded-xl hover:border-black transition-all cursor-pointer shadow-sm">
          <span className="text-xs font-semibold whitespace-nowrap">Display total before taxes</span>
          <div className="w-8 h-4 bg-gray-300 rounded-full relative">
            <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;