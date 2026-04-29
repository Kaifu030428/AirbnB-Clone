import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PropertyCard from "../components/PropertyCard";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";
import axios from "axios";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);

  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("location")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/properties");
        if (res.data.success) {
          setProperties(res.data.properties);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = 
        property.location?.toLowerCase().includes(searchQuery) ||
        property.title?.toLowerCase().includes(searchQuery) ||
        property.description?.toLowerCase().includes(searchQuery);

      const matchesCategory = !categoryFilter || 
        property.location?.toLowerCase().includes(categoryFilter.toLowerCase()) ||
        property.title?.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [categoryFilter, searchQuery, properties]);

  return (
    // 🌸 AESTHETIC THEME: Pure White background with Slate text
    <div className="w-full bg-[#FAFDFF] min-h-screen text-slate-800 font-sans pb-24">
      
      {/* ☁️ LUXE HERO SECTION: Fresh & Airy */}
      {!searchQuery && !categoryFilter && (
        <div className="relative w-full h-[40vh] md:h-[50vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-pink-50 border-b border-blue-100/50">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-8">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-pink-400 tracking-[0.2em] uppercase text-xs md:text-sm font-bold mb-4"
            >
              Curated Aesthetic Spaces
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight"
            >
              Stay with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">LUXE</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-500 mt-4 md:text-lg max-w-xl mx-auto font-medium"
            >
              Discover beautiful, handpicked rooms designed for your perfect getaway.
            </motion.p>
          </div>
        </div>
      )}

      {/* Sticky Filters: Glassmorphism on White */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-100 relative z-[100] sticky top-[73px] shadow-sm">
        <div className="max-w-[2520px] mx-auto py-3">
          <SearchBar />
          <Categories />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="px-6 md:px-16 lg:px-20 py-12 relative z-10 max-w-[2520px] mx-auto">
        
        {/* Minimalist Info Header with Pastel Badges */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              {categoryFilter ? `${categoryFilter} Stays` : "Featured Rooms"}
            </h2>
          </motion.div>
          
          {/* Pastel Filter Badges */}
          {(searchQuery || categoryFilter) && (
            <div className="flex gap-3 flex-wrap">
              {searchQuery && (
                <span className="text-sm bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full border border-blue-100 font-semibold tracking-wide">
                  {searchQuery}
                </span>
              )}
              {categoryFilter && (
                <span className="text-sm bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full border border-pink-100 font-semibold tracking-wide">
                  {categoryFilter}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Property Grid */}
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  key={property._id || property.id}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State: Aesthetic & Friendly */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm mt-4"
            >
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <span className="material-symbols-outlined text-4xl text-blue-300">search_off</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">No rooms available</h2>
              <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">
                We couldn't find any stays matching your current filters.
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="mt-8 px-6 py-3 bg-pink-50 text-pink-600 font-bold rounded-full hover:bg-pink-100 transition-colors duration-300"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Map Button: Aesthetic Gradient */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-400 to-pink-400 text-white flex items-center gap-2 px-6 py-3.5 rounded-full shadow-[0_8px_20px_rgba(244,114,182,0.3)] hover:shadow-[0_8px_25px_rgba(244,114,182,0.4)] transition-all font-bold text-sm"
        >
          <span>Explore Map</span>
          <span className="material-symbols-outlined text-[18px]">map</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Home;