import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PropertyCard from "../components/PropertyCard";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import { properties } from "../data/properties";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  // Functionality: URL Params Extract karna
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("location")?.toLowerCase() || "";
  const guestsFilter = Number(searchParams.get("guests")) || 1;

  // Logic: Complex Filtering Engine
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // 1. Search Query Logic (Title, Location ya Description mein match)
      const matchesSearch = 
        property.location.toLowerCase().includes(searchQuery) ||
        property.title.toLowerCase().includes(searchQuery) ||
        property.description.toLowerCase().includes(searchQuery);

      // 2. Category Logic (Agar category data mein nahi hai, toh hum default true rakh rahe hain jab tak data update na ho)
      // Note: Aapke naye data mein 'category' field missing hai, isliye hum logic location se infer kar sakte hain ya pure matches search par rely kar sakte hain.
      const matchesCategory = !categoryFilter || 
        property.location.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        property.title.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [categoryFilter, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [categoryFilter, searchQuery]);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Search & Categories Section (Sticky aware) */}
     {/* 1. Header Wrapper: Isko absolute/sticky positioning se bahar nikaalo agar Navbar already sticky hai */}
<div className="bg-white border-b border-gray-100 relative z-[100]">
  <div className="max-w-[2520px] mx-auto">
    <SearchBar />
    <Categories />
  </div>
</div>

{/* 2. Main Content: Margin aur Padding ko neutralize karo taaki text overlap na ho */}
<main className="px-6 md:px-16 lg:px-20 py-12 relative z-10">
  
  {/* Results Info Section: Spacing badhao */}
  <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
        {categoryFilter ? `${categoryFilter} Stays` : "Stays in India"}
      </h1>
      <p className="text-gray-500 mt-1.5 font-light text-base">
        Showing {filteredProperties.length} handpicked homes in India
      </p>
    </motion.div>
          
          {/* Active Filter Badges UI */}
          {(searchQuery || categoryFilter) && (
            <div className="flex gap-2 flex-wrap">
              {searchQuery && (
                <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200 font-medium">
                  Location: {searchQuery}
                </span>
              )}
              {categoryFilter && (
                <span className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-full font-medium">
                  {categoryFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Grid Management with Animation */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-12"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredProperties.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-x-6 gap-y-12"
            >
              {filteredProperties.map((property) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  key={property.id}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State: Jab kuch na mile */
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="bg-gray-50 p-6 rounded-full mb-6">
                <span className="material-symbols-outlined text-5xl text-gray-300">search_off</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">No exact matches</h2>
              <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Try changing or removing some of your filters or adjusting your search area.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-8 px-6 py-3 border border-black rounded-xl font-bold hover:bg-gray-50 transition"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Map Toggle Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-900 text-white flex items-center gap-2 px-6 py-3.5 rounded-full shadow-2xl hover:bg-black transition-all font-semibold text-sm"
        >
          <span>Show map</span>
          <span className="material-symbols-outlined text-[20px]">map</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Home;