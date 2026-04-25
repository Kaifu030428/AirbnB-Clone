import React, { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ImageGallery from "../components/ImageGallery";
import CustomDatePicker from "../components/CustomDatePicker"; // Apna naya premium calendar
import { properties } from "../data/properties";
import toast from "react-hot-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const propertyId = Number(id);
  const selectedProperty = properties.find((item) => item.id === propertyId);

  const pricePerNight = selectedProperty?.price ?? 10000;
  const maxGuests = selectedProperty?.guests ?? 4;
  const serviceFee = 1200;

  // New State for Date Range
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [guests, setGuests] = useState(1);

  // Advanced Nights Calculation
  const nightsCount = useMemo(() => {
    if (!dateRange.start || !dateRange.end) return 0;
    const diff = dateRange.end.getTime() - dateRange.start.getTime();
    const res = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return res > 0 ? res : 0;
  }, [dateRange]);

  const basePrice = nightsCount * pricePerNight;
  const totalPrice = basePrice + serviceFee;

  if (!selectedProperty) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
        <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">sentiment_very_dissatisfied</span>
        <h1 className="text-2xl font-bold text-gray-900">Listing not found</h1>
        <p className="text-gray-500 mt-2 max-w-sm">We couldn't find the place you're looking for. It might have been unlisted.</p>
        <Link to="/" className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-black transition-all">
          Go back home
        </Link>
      </div>
    );
  }

  const handleReserve = () => {
    if (!dateRange.start || !dateRange.end || nightsCount === 0) return;
    
    // Format dates for the next page
    const checkIn = dateRange.start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    const checkOut = dateRange.end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    navigate(`/booking/${id}`, {
      state: { checkIn, checkOut, guests, totalPrice, propertyName: selectedProperty.title, propertyLocation: selectedProperty.location },
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-[2520px] mx-auto px-6 md:px-16 lg:px-20 py-8"
    >
      {/* Title Section */}
      <section className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {selectedProperty.title}
        </h1>
        <div className="flex items-center justify-between text-sm font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 underline underline-offset-2">
               ⭐ {selectedProperty.rating}
            </span>
            <span className="underline underline-offset-2 text-gray-600">{selectedProperty.location}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-800">
             <button className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-lg transition underline">
               <span className="material-symbols-outlined text-sm">ios_share</span> Share
             </button>
             <button className="flex items-center gap-1 hover:bg-gray-100 p-2 rounded-lg transition underline">
               <span className="material-symbols-outlined text-sm">favorite</span> Save
             </button>
          </div>
        </div>
      </section>

      {/* Corrected Hero Image Section */}
      <section className="mb-10 pt-2">
        <ImageGallery images={selectedProperty?.images ? selectedProperty.images : [selectedProperty.image]} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Left Side: Info */}
        <div className="lg:col-span-8">
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h2 className="text-2xl font-semibold mb-1">Entire home hosted by ArBn Host</h2>
            <p className="text-gray-500 font-light">{maxGuests} guests · 2 bedrooms · 2 beds · 1 bath</p>
          </div>

          <div className="space-y-6 pb-8 border-b border-gray-200">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[32px] text-gray-800">workspace_premium</span>
              <div>
                <p className="font-semibold text-gray-900">ArBn is a Superhost</p>
                <p className="text-sm text-gray-500">Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[32px] text-gray-800">location_on</span>
              <div>
                <p className="font-semibold text-gray-900">Great location</p>
                <p className="text-sm text-gray-500">95% of recent guests gave the location a 5-star rating.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[32px] text-gray-800">calendar_month</span>
              <div>
                <p className="font-semibold text-gray-900">Free cancellation for 48 hours.</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">About this space</h2>
            <p className="text-gray-700 leading-relaxed font-light">
              {selectedProperty.description} Experience the best of hospitality in this uniquely designed home, carefully crafted to provide you with the ultimate comfort and a memorable stay.
            </p>
          </div>
        </div>

        {/* Right Side: Floating Booking Card */}
        <div className="lg:col-span-4 relative">
          <Card className="sticky top-28 p-6 shadow-2xl border border-gray-200 rounded-3xl bg-white z-10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <span className="text-2xl font-bold">₹{pricePerNight.toLocaleString("en-IN")}</span>
                <span className="text-gray-500 font-light text-sm"> / night</span>
              </div>
            </div>

            {/* Premium Interactive Controls */}
            <div className="border border-gray-300 rounded-xl overflow-hidden mb-4">
              
              {/* Custom Date Picker Integration */}
              <div className="w-full border-b border-gray-300 bg-white">
                <CustomDatePicker onDateChange={setDateRange} />
              </div>

              {/* Guest Selector */}
              <div className="p-3 bg-white">
                <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">Guests</label>
                <select 
                  className="w-full text-sm outline-none bg-transparent font-light"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {[...Array(maxGuests)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} guest{i > 0 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button 
              onClick={handleReserve}
              disabled={nightsCount === 0}
              className={`w-full py-3.5 rounded-xl text-lg font-bold tracking-wide shadow-md transition-all ${
                nightsCount > 0 ? "bg-[#FF385C] hover:bg-[#E31C5F] text-white active:scale-[0.98]" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {nightsCount > 0 ? "Reserve" : "Check availability"}
            </Button>

            <AnimatePresence>
              {nightsCount > 0 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-6 space-y-4 text-gray-600"
                >
                  <p className="text-center text-sm text-gray-500 mb-2">You won't be charged yet</p>
                  <div className="flex justify-between font-light">
                    <span className="underline cursor-pointer hover:text-black">₹{pricePerNight.toLocaleString("en-IN")} x {nightsCount} nights</span>
                    <span>₹{basePrice.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between font-light">
                    <span className="underline cursor-pointer hover:text-black">Airbnb service fee</span>
                    <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                  </div>
                  <hr className="border-gray-200 mt-4" />
                  <div className="flex justify-between text-black font-bold text-lg pt-2">
                    <span>Total before taxes</span>
                    <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;