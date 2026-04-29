import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Card from "../components/ui/Card";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/bookings", {
          withCredentials: true,
        });
        if (res.data.success) {
          setBookings(res.data.bookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF385C]"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">
          flight_takeoff
        </span>
        <h1 className="text-2xl font-bold text-gray-900">No trips booked... yet!</h1>
        <p className="text-gray-500 mt-2 max-w-sm">
          Time to dust off your bags and start planning your next adventure.
        </p>
        <Link
          to="/"
          className="mt-6 border border-black text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all"
        >
          Start searching
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-16 lg:px-20 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Trips</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          if (!booking.property) return null; // Handle case where property was deleted

          return (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition">
                <Link to={`/property/${booking.property._id}`}>
                  <img
                    src={booking.property.image}
                    alt={booking.property.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                      {booking.property.location}
                    </h3>
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                      {booking.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-1 font-light">
                    {booking.property.title}
                  </p>
                  
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="material-symbols-outlined text-[18px] text-gray-400">
                        calendar_month
                      </span>
                      <span>
                        {booking.checkIn} - {booking.checkOut}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="material-symbols-outlined text-[18px] text-gray-400">
                        payments
                      </span>
                      <span className="font-semibold text-black">
                        ₹{booking.totalPrice?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBookings;
