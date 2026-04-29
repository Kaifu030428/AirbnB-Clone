import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";
import toast from "react-hot-toast";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/properties/${id}`);
        if (res.data.success) {
          setSelectedProperty(res.data.property);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  // Extracting state from previous page
  const { checkIn, checkOut, guests, totalPrice, propertyName } = location.state || {};
  const validBookingData = checkIn && checkOut && guests && totalPrice;

  // Dynamic Calculation
  const serviceFee = 1200;
  const basePrice = totalPrice ? totalPrice - serviceFee : 0;
  const nightsCount = selectedProperty ? Math.round(basePrice / selectedProperty.price) : 0;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Split with Friends State
  const [isSplitting, setIsSplitting] = useState(false);
  const [friendsCount, setFriendsCount] = useState(1);

  const handleBooking = async () => {
    if (!name || !phone) return;
    
    setIsSubmitting(true);
    const toastId = toast.loading("Processing your booking...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/bookings",
        {
          propertyId: id,
          checkIn,
          checkOut,
          guests,
          totalPrice,
          name,
          phone,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Booking confirmed!", { id: toastId });
        setIsConfirmed(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to confirm booking. Are you logged in?",
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[75vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
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

            {/* 🤝 Split Bill with Friends Feature */}
            <section className="bg-gradient-to-br from-[#FF385C]/5 to-pink-50 p-6 rounded-2xl border border-[#FF385C]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-8xl">group</span>
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2 text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#FF385C]">call_split</span>
                  Split with Friends
                </h2>
                <p className="text-gray-600 text-sm mb-5 font-light">
                  Traveling with a group? Split the cost easily. You only pay your share today!
                </p>
                
                <div className="flex items-center gap-4 mb-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${isSplitting ? 'bg-[#FF385C]' : 'bg-gray-300'}`} onClick={() => setIsSplitting(!isSplitting)}>
                      <motion.div 
                        layout 
                        className="bg-white w-4 h-4 rounded-full shadow-md"
                        animate={{ x: isSplitting ? 24 : 0 }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">Enable Split Payment</span>
                  </label>
                </div>

                <AnimatePresence>
                  {isSplitting && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">How many friends are joining?</label>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setFriendsCount(Math.max(1, friendsCount - 1))}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition active:scale-95 bg-white"
                          >
                            <span className="material-symbols-outlined text-lg">remove</span>
                          </button>
                          <span className="text-lg font-semibold w-6 text-center">{friendsCount}</span>
                          <button 
                            onClick={() => setFriendsCount(Math.min(10, friendsCount + 1))}
                            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-black transition active:scale-95 bg-white"
                          >
                            <span className="material-symbols-outlined text-lg">add</span>
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Invite them via Email</label>
                        <div className="relative border border-gray-300 bg-white rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#FF385C] focus-within:border-transparent transition-all flex items-center gap-2">
                          <span className="material-symbols-outlined text-gray-400 text-lg">mail</span>
                          <input
                            type="text"
                            placeholder="friend1@email.com, friend2@..."
                            className="w-full text-sm outline-none font-light"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 font-light">We'll send them a secure link to pay their share.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              disabled={!name || !phone || isSubmitting}
              className={`w-full md:w-fit px-12 py-4 text-lg font-bold rounded-xl shadow-lg transition-all active:scale-[0.98] ${
                name && phone && !isSubmitting ? "bg-[#FF385C] hover:bg-[#D70466] text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Processing..." : "Confirm and pay"}
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
                            <span className={isSplitting ? "line-through text-gray-400 text-base" : ""}>₹{Number(totalPrice).toLocaleString("en-IN")}</span>
                        </div>
                        
                        <AnimatePresence>
                          {isSplitting && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="mt-4 p-4 bg-[#FF385C]/10 rounded-xl border border-[#FF385C]/20"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-semibold text-gray-900 text-sm">Your share today</span>
                                <span className="font-bold text-[#FF385C] text-xl">₹{Math.round(totalPrice / (friendsCount + 1)).toLocaleString("en-IN")}</span>
                              </div>
                              <p className="text-[11px] text-gray-600 font-light text-right">
                                Split exactly by {friendsCount + 1} people
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
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