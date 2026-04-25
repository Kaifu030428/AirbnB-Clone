import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

const Wishlist = () => {
  // Demo ke liye hum initial state mein kuch properties le rahe hain
  // Real app mein ye state ya database se aayega
  const [wishlistItems, setWishlistItems] = useState(properties.slice(0, 3));

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 min-h-[70vh]">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Wishlists</h1>
      </header>

      <AnimatePresence mode="popLayout">
        {wishlistItems.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10"
          >
            {wishlistItems.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                className="relative"
              >
                <PropertyCard property={property} />
                
                {/* Custom Remove Button (Optional) */}
                <button 
                  onClick={() => removeFromWishlist(property.id)}
                  className="absolute top-4 left-4 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all active:scale-90 z-10"
                  title="Remove from wishlist"
                >
                  <span className="material-symbols-outlined text-sm font-bold text-black">close</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State View */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-start max-w-md mt-10"
          >
            <h2 className="text-2xl font-semibold text-gray-900">Create your first wishlist</h2>
            <p className="text-gray-500 mt-2 mb-8 leading-relaxed">
              As you explore, click the heart icon to save your favorite places and Experiences to a wishlist.
            </p>
            <Link 
              to="/" 
              className="bg-black text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-all active:scale-95"
            >
              Start searching
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion Section (Airbnb Style) */}
      {wishlistItems.length > 0 && (
        <div className="mt-20 pt-10 border-t border-gray-100">
          <h3 className="text-xl font-semibold mb-2">Still looking?</h3>
          <p className="text-gray-500 mb-6 font-light text-sm">Keep exploring amazing places around the world.</p>
          <Link to="/" className="text-black font-semibold underline underline-offset-4 hover:text-gray-600 transition">
            Show more stays
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;