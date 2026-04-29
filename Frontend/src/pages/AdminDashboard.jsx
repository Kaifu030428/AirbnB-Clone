import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/bookings/admin/stats", {
          withCredentials: true
        });
        
        if (res.data.success) {
          setStats(res.data.stats);
          setRecentBookings(res.data.recentBookings);
        }
      } catch (error) {
        toast.error("Failed to load dashboard data");
        console.error("Dashboard error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#FAFDFF]">
        {/* Aesthetic Pastel Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-pink-400"></div>
      </div>
    );
  }

  return (
    // 🌸 AESTHETIC THEME: Pure White / Light Blue background
    <div className="min-h-screen bg-[#FAFDFF] font-sans text-slate-800 pb-24 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-10 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">Partner Dashboard</h1>
            <p className="text-slate-500 mt-2 font-medium">Overview of your LUXE rooms and bookings.</p>
          </div>
          <Link 
            to="/add-property" 
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-400 to-pink-400 text-white px-7 py-3.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add_home</span>
            List New Room
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-green-50 p-3.5 rounded-2xl text-green-500 border border-green-100">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="text-slate-500 font-bold tracking-wide text-sm uppercase">Total Earnings</h3>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">₹{stats.totalEarnings.toLocaleString("en-IN")}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-50 p-3.5 rounded-2xl text-blue-500 border border-blue-100">
                <span className="material-symbols-outlined">book_online</span>
              </div>
              <h3 className="text-slate-500 font-bold tracking-wide text-sm uppercase">Total Bookings</h3>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">{stats.totalBookings}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-pink-50 p-3.5 rounded-2xl text-pink-500 border border-pink-100">
                <span className="material-symbols-outlined">real_estate_agent</span>
              </div>
              <h3 className="text-slate-500 font-bold tracking-wide text-sm uppercase">Active Rooms</h3>
            </div>
            <p className="text-3xl font-extrabold text-slate-800">{stats.totalProperties}</p>
          </motion.div>
        </div>

        {/* Bookings Table */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-6 tracking-tight">Recent Bookings</h2>
          
          {recentBookings.length === 0 ? (
            /* Aesthetic Empty State */
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="bg-blue-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-3xl text-blue-300">inbox</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">No bookings yet</h3>
              <p className="text-slate-500 font-medium mt-2">When someone books your room, it will appear here.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-widest font-extrabold">
                      <th className="p-5">Guest</th>
                      <th className="p-5">Room</th>
                      <th className="p-5">Dates</th>
                      <th className="p-5">Guests</th>
                      <th className="p-5">Amount</th>
                      <th className="p-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-5">
                          <div className="font-bold text-slate-800">{booking.name}</div>
                          <div className="text-sm text-slate-500 font-medium">{booking.phone}</div>
                        </td>
                        <td className="p-5 text-slate-700 font-bold">{booking.property?.title || 'Deleted Property'}</td>
                        <td className="p-5 text-slate-500 text-sm font-medium">
                          {booking.checkIn} - {booking.checkOut}
                        </td>
                        <td className="p-5 text-slate-600 font-medium">{booking.guests}</td>
                        <td className="p-5 font-extrabold text-slate-800">₹{booking.totalPrice.toLocaleString("en-IN")}</td>
                        <td className="p-5">
                          <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-[11px] font-extrabold tracking-wider border border-green-100">
                            CONFIRMED
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;