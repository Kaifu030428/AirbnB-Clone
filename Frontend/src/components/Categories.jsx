import React, { useState } from "react";

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
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].label);

  return (
    <div className="flex items-center space-x-8 px-6 md:px-10 py-5 overflow-x-auto no-scrollbar border-b border-gray-100">
      {categories.map((item) => (
        <div
          key={item.label}
          onClick={() => setActiveCategory(item.label)}
          className={`flex flex-col items-center min-w-max gap-2 cursor-pointer transition-all duration-300 pb-2 border-b-2 ${
            activeCategory === item.label
              ? "text-black border-black"
              : "text-gray-500 border-transparent hover:text-black hover:border-gray-300"
          }`}
        >
          <span className="material-symbols-outlined text-2xl">{item.icon}</span>
          <p className="text-sm font-medium">{item.label}</p>
        </div>
      ))}
      
      {/* Filters Button */}
      <div className="hidden md:flex ml-auto items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
        <span className="material-symbols-outlined text-lg">tune</span>
        <span className="text-sm font-semibold">Filters</span>
      </div>
    </div>
  );
};

export default Categories;
