import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/ui/Card";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/properties/user-properties", {
        withCredentials: true,
      });
      if (res.data.success) {
        setProperties(res.data.properties);
      }
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this listing?")) return;

    try {
      const toastId = toast.loading("Removing listing...");
      const res = await axios.delete(`http://localhost:8000/api/properties/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Listing removed successfully!", { id: toastId });
        setProperties(properties.filter((prop) => prop._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to remove listing");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
          holiday_village
        </span>
        <h1 className="text-2xl font-bold text-gray-900">You don't have any listings yet</h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          It's easy to get started and host on Airbnb. Earn money and meet great people.
        </p>
        <Link
          to="/add-property"
          className="mt-6 bg-[#FF385C] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#D70466] transition-all"
        >
          Airbnb your home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manage Listings</h1>
        <Link
          to="/add-property"
          className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md"
        >
          + Add Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {properties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <Link to={`/property/${property._id}`}>
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-md transition-all active:scale-90"
                    title="Delete Listing"
                  >
                    <span className="material-symbols-outlined text-[18px] font-bold">delete</span>
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                      {property.location}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-1 font-light">
                    {property.title}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="font-semibold text-black">
                      ₹{property.price.toLocaleString("en-IN")} <span className="font-light text-gray-500 text-sm">night</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyProperties;
