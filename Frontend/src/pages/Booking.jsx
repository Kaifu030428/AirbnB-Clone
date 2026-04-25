import React, { useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { properties } from "../data/properties";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = Number(id);
  const selectedProperty = properties.find((item) => item.id === propertyId);

  // Extracting state from previous page
  const { checkIn, checkOut, guests, totalPrice, propertyName } = location.state || {};
  const validBookingData = checkIn && checkOut && guests && totalPrice;

  // Dynamic Calculation (Removing the 5-nights hardcoded bug)
  const serviceFee = 1200;
  const basePrice = totalPrice ? totalPrice - serviceFee : 0;
  const nightsCount = selectedProperty ? Math.round(basePrice / selectedProperty.price) : 0;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBooking = () => {
    if (!name || !phone) return;
    
    // Simulate API Call with loading state
    setIsConfirmed(true);
    setTimeout(() => {
        // Redirect logic will go here
        // navigate("/"); 
    }, 4000);
  };

  // Success State UI
  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center bg-white">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-100"
        >
          <span className="material-symbols-outlined text-5xl">check_circle</span>
        </motion.div>
        <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold text-gray-900">
          Booking Confirmed!
        </motion.h1>
        <motion.p initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-500 mt-3 text-lg max-w-md font-light">
          Pack your bags! Your stay at <span className="font-semibold text-black">{propertyName}</span> is officially booked.
        </motion.p>
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Link to="/" className="mt-8 inline-block bg-gray-900 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-black transition-all shadow-lg active:scale-95">
            Explore more stays
            </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 md:px-16 lg:px-20 py-10 min-h-screen"
    >
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-8 hover:bg-gray-50 p-2 rounded-full w-fit transition -ml-2">
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        <span className="font-semibold text-[15px]">Confirm and pay</span>
      </button>

      {!selectedProperty || !validBookingData ? (
        <div className="max-w-2xl py-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Something went wrong</h2>
            <p className="text-gray-600 mb-8 font-light">We don't have enough information to complete your booking. Please go back and select your dates again.</p>
            <Link to="/" className="bg-[#FF385C] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:bg-[#E31C5F] transition">
                Return to home
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative">
          
          {/* Left: Booking Form */}
          <div className="lg:col-span-7 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Your trip</h2>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="font-semibold text-gray-900 text-[15px]">Dates</p>
                  <p className="text-gray-600 font-light text-[15px]">{checkIn} – {checkOut}</p>
                </div>
                {/* Fixed Edit Button */}
                <button onClick={() => navigate(-1)} className="underline font-semibold text-sm hover:text-gray-600 transition">Edit</button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900 text-[15px]">Guests</p>
                  <p className="text-gray-600 font-light text-[15px]">{guests} guest{guests > 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => navigate(-1)} className="underline font-semibold text-sm hover:text-gray-600 transition">Edit</button>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Enter your details</h2>
              <div className="space-y-4">
                <div className="relative border border-gray-400 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all">
                    <label className="block text-[10px] font-bold uppercase text-gray-500">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="Name on ID"
                        className="w-full text-sm outline-none bg-transparent pt-1 font-light"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="relative border border-gray-400 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-black focus-within:border-black transition-all">
                    <label className="block text-[10px] font-bold uppercase text-gray-500">Phone Number</label>
                    <input
                        type="tel"
                        value={phone}
                        placeholder="For host updates"
                        className="w-full text-sm outline-none bg-transparent pt-1 font-light"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Cancellation policy</h2>
                <p className="text-gray-600 text-[15px] font-light leading-relaxed">
                    <span className="font-semibold text-black">Non-refundable.</span> If you cancel, you won't get a refund. 
                    Please make sure you're ready for your trip before confirming.
                </p>
            </section>

            <Button
              onClick={handleBooking}
              disabled={!name || !phone}
              className={`w-full md:w-fit px-12 py-4 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] ${
                name && phone ? "bg-[#FF385C] hover:bg-[#D70466] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm and pay
            </Button>
          </div>

          {/* Right: Property Summary Card */}
          <div className="lg:col-span-5 relative">
            <Card className="lg:sticky lg:top-28 p-6 border border-gray-200 rounded-[24px] shadow-xl space-y-6 bg-white z-10">
                <div className="flex gap-4 border-b border-gray-200 pb-6">
                    <img 
                        src={selectedProperty.image} 
                        className="w-[120px] h-[100px] object-cover rounded-xl shadow-sm" 
                        alt="Property preview"
                    />
                    <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">Entire Home</p>
                            <h3 className="text-[15px] font-medium leading-tight mt-0.5">{selectedProperty.title}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-[12px]">
                            <span className="material-symbols-outlined text-[14px] fill-1">star</span>
                            <span className="font-semibold">{selectedProperty.rating}</span>
                            <span className="text-gray-500 font-light">(Reviews)</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Price details</h3>
                    <div className="space-y-3 text-[15px] text-gray-600 font-light">
                        <div className="flex justify-between">
                            {/* Dynamic Calculation Applied Here */}
                            <span>₹{selectedProperty.price.toLocaleString("en-IN")} x {nightsCount} nights</span>
                            <span>₹{basePrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Airbnb service fee</span>
                            <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                        </div>
                        <hr className="border-gray-200 mt-4" />
                        <div className="flex justify-between text-black font-bold text-lg pt-2">
                            <span>Total (INR)</span>
                            <span>₹{Number(totalPrice).toLocaleString("en-IN")}</span>
                        </div>
                    </div>
                </div>
            </Card>
          </div>

        </div>
      )}
    </motion.div>
  );
};

export default Booking;