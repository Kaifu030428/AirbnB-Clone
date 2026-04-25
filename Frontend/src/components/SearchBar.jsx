import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const regions = [
    { name: "I'm flexible", img: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg" },
    { name: "Southeast Asia", img: "https://a0.muscache.com/im/pictures/d77de976-2c50-4505-a400-d39d75d3455a.jpg" },
    { name: "India", img: "https://a0.muscache.com/im/pictures/663332ea-a99a-4649-b033-0f9bc48956b9.jpg" },
  ];

  return (
    <div className="relative flex justify-center w-full bg-white pb-4 z-[100]">
      <div className={`relative flex items-center border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all ${isExpanded ? "bg-gray-100" : "bg-white"}`}>
        
        {/* Destination Input */}
        <div 
          className="flex flex-col px-8 py-3 cursor-pointer rounded-full hover:bg-white hover:shadow-md transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <label className="text-[10px] font-bold uppercase">Where</label>
          <input 
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <div className="h-8 w-[1px] bg-gray-200" />

        {/* Search Button */}
        <div className="pr-2 pl-4">
            <button 
                onClick={() => navigate(`/search?location=${location}`)}
                className="bg-[#FF385C] hover:bg-[#E31C5F] text-white p-3 rounded-full flex items-center gap-2 transition-all"
            >
                <span className="material-symbols-outlined text-sm">search</span>
                {isExpanded && <span className="text-sm font-semibold pr-2">Search</span>}
            </button>
        </div>

        {/* Region Dropdown - FIXED POSITIONING */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 20, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-[32px] p-8 shadow-2xl z-[110]"
            >
              <p className="text-sm font-bold mb-5">Search by region</p>
              <div className="grid grid-cols-3 gap-4">
                {regions.map((r) => (
                  <div 
                    key={r.name} 
                    className="cursor-pointer group"
                    onClick={() => { setLocation(r.name); setIsExpanded(false); }}
                  >
                    <img src={r.img} className="rounded-xl border border-gray-200 group-hover:border-black transition-all mb-2" alt="" />
                    <p className="text-xs text-gray-700">{r.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;