import React from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { label: "Goa", icon: "beach_access" },
  { label: "Mumbai", icon: "location_city" },
  { label: "Delhi", icon: "account_balance" },
  { label: "Manali", icon: "ac_unit" },
  { label: "Kerala", icon: "sailing" },
  { label: "Jaipur", icon: "castle" },
  { label: "Bangalore", icon: "computer" },
  { label: "Pune", icon: "coffee" },
  { label: "Chennai", icon: "temple_hindu" },
  { label: "Kolkata", icon: "tram" },
  { label: "Udaipur", icon: "water" },
  { label: "Agra", icon: "mosque" },
];

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

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
    <div className="flex items-center w-full bg-white px-6 md:px-16 pt-4 pb-2">
      
      {/* Scrollable Container */}
      <div className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar w-full pb-2">
        {categories.map((item) => {
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
                className={`material-symbols-outlined text-[26px] ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}
              >
                {item.icon}
              </motion.span>
              
              <p className={`text-[13px] font-medium tracking-tight ${isActive ? "font-semibold text-black" : ""}`}>
                {item.label}
              </p>

              {/* Animated Underline */}
              {isActive ? (
                <motion.div
                  layoutId="categoryUnderline"
                  className="absolute -bottom-[12px] left-0 right-0 h-[2px] bg-black"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              ) : (
                <div className="absolute -bottom-[12px] left-0 right-0 h-[2px] bg-transparent group-hover:bg-gray-200 transition-colors" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;