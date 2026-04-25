import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";

const PropertyRow = ({ title, properties = [], viewAllLink = "/" }) => {
  // Agar properties khali hain toh hum 5 placeholders dikhayenge (demo ke liye)
  const displayItems = properties.length > 0 ? properties : Array(6).fill({});

  return (
    <div className="px-6 md:px-16 mt-12 overflow-hidden">
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 font-light">
            Handpicked stays just for you.
          </p>
        </div>
        <Link 
          to={viewAllLink} 
          className="text-sm font-semibold underline underline-offset-4 hover:text-gray-600 transition"
        >
          Show all
        </Link>
      </div>

      {/* Horizontal Scroll Container */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex gap-5 overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory"
      >
        {displayItems.map((item, index) => (
          <motion.div 
            key={item.id || index}
            className="min-w-[280px] md:min-w-[320px] lg:min-w-[300px] snap-start"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PropertyCard property={item} />
          </motion.div>
        ))}

        {/* "View More" Card at the end */}
        <Link 
          to={viewAllLink}
          className="min-w-[200px] snap-start flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl hover:border-gray-900 hover:bg-gray-50 transition-all group"
        >
          <div className="bg-gray-100 p-3 rounded-full group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-gray-600">arrow_forward</span>
          </div>
          <span className="mt-2 font-semibold text-sm">View more</span>
        </Link>
      </motion.div>
    </div>
  );
};

export default PropertyRow;