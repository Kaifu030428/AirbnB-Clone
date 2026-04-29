import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const AITripPlanner = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [groupType, setGroupType] = useState("Friends");
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!destination) {
      toast.error("Please enter a destination!");
      return;
    }

    setIsLoading(true);
    setItinerary(""); // Clear previous

    try {
      const res = await axios.post("http://localhost:8000/api/ai/plan-trip", {
        destination,
        days,
        groupType,
      });

      if (res.data.success) {
        setItinerary(res.data.itinerary);
        toast.success("AI Itinerary generated successfully! ✨");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 🌸 AESTHETIC THEME: Soft Pearl Background
    <div className="min-h-screen bg-[#FAFDFF] pt-10 pb-20 px-6 md:px-16 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 text-pink-500 px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="font-bold text-xs tracking-wider uppercase">Powered by LUXE AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 mb-4 tracking-tight leading-tight">
            Plan your perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">Escape</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Tell us where you're going, and our AI will build a personalized, day-by-day itinerary for your trip.
          </p>
        </motion.div>

        {/* Form Section */}
        <div className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Destination Input */}
            <div className="col-span-1 md:col-span-3">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Where do you want to go?
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  location_on
                </span>
                <input
                  type="text"
                  placeholder="e.g. Goa, Manali, Paris..."
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all text-lg text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Days Input */}
            <div className="col-span-1 md:col-span-1">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                How many days?
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                  calendar_month
                </span>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all text-lg text-slate-800"
                />
              </div>
            </div>

            {/* Travel Group Selection */}
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Who are you traveling with?
              </label>
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {["Solo", "Couple", "Friends", "Family"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setGroupType(type)}
                    className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all border ${
                      groupType === type
                        ? "bg-slate-800 text-white border-slate-800 shadow-md"
                        : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-3 mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white font-bold text-lg py-4.5 rounded-2xl transition-all shadow-[0_8px_20px_rgba(244,114,182,0.3)] hover:shadow-[0_8px_25px_rgba(244,114,182,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                    Crafting your experience...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">magic_button</span>
                    Generate My Itinerary
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {itinerary && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mt-12 bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
            >
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-800">Your AI Itinerary</h2>
                  <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-blue-400">flight_takeoff</span>
                    {days} Days in {destination} • {groupType}
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(itinerary);
                    toast.success("Copied to clipboard! 📋");
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl font-bold transition-colors border border-blue-100"
                >
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  Copy
                </button>
              </div>

              {/* Markdown Content - Customized for Aesthetic Theme */}
              <div className="prose prose-lg max-w-none prose-slate prose-headings:font-extrabold prose-headings:text-slate-800 prose-p:text-slate-600 prose-p:font-medium prose-li:text-slate-600 prose-li:font-medium prose-strong:text-slate-800 prose-strong:font-bold prose-a:text-blue-500 hover:prose-a:text-pink-500 transition-colors">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AITripPlanner;