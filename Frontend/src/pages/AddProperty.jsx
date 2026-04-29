import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    category: "Amazing pools",
    price: "",
    description: "",
    image: "",
  });

  const totalSteps = 3;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleMagicWrite = async () => {
    if (!formData.description || formData.description.trim().length < 3) {
      toast.error("Please enter a few words first (e.g. 'goa, pool, beach') to generate description.");
      return;
    }

    setIsGeneratingAI(true);
    const toastId = toast.loading("AI is crafting your description...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/ai/magic-write",
        { keywords: formData.description },
        { withCredentials: true }
      );

      if (response.data.success) {
        setFormData(prev => ({ ...prev, description: response.data.description }));
        toast.success("Description generated perfectly! ✨", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate description via AI.", { id: toastId });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const [isPricingAI, setIsPricingAI] = useState(false);

  const handleSmartPricing = async () => {
    if (!formData.title || !formData.location) {
      toast.error("Please enter Title and Location in Step 1 first.");
      return;
    }

    setIsPricingAI(true);
    const toastId = toast.loading("AI is analyzing market data to suggest a price...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/ai/suggest-price",
        { 
          title: formData.title, 
          location: formData.location, 
          description: formData.description 
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setFormData(prev => ({ ...prev, price: response.data.suggestedPrice }));
        toast.success(`AI Price applied! ${response.data.reasoning}`, { id: toastId, duration: 5000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch smart price.", { id: toastId });
    } finally {
      setIsPricingAI(false);
    }
  };

  const handleSubmit = async () => {
    // Basic validation fallback
    if (!formData.title || !formData.location || !formData.price || !formData.description) {
      toast.error("Please fill all required fields before publishing.");
      return;
    }

    const payload = {
      ...formData,
      image: formData.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };

    const toastId = toast.loading("Publishing your listing...");
    try {
      const response = await axios.post(
        "http://localhost:8000/api/properties",
        payload,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Property listed successfully!", { id: toastId });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to publish listing. Are you logged in?",
        { id: toastId }
      );
    }
  };

  return (
    // 🌸 AESTHETIC THEME: Pure White background
    <div className="min-h-screen bg-[#FAFDFF] flex flex-col font-sans text-slate-800">
      {/* Progress Bar: Aesthetic Gradient */}
      <div className="fixed top-[73px] left-0 w-full h-1.5 bg-slate-100 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-400 to-pink-400" 
          initial={{ width: "0%" }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-20 pb-32">
        <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">Where is your room located?</h1>
                <p className="text-slate-500 font-medium">Guests will only get your exact address after they book a reservation.</p>
                <div className="space-y-4 pt-6">
                  <input
                    name="title"
                    placeholder="Room Title (e.g. Aesthetic Beachfront Suite)"
                    className="w-full p-5 text-lg border border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                    onChange={handleChange}
                    value={formData.title}
                  />
                  <input
                    name="location"
                    placeholder="City, State, Country"
                    className="w-full p-5 text-lg border border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                    onChange={handleChange}
                    value={formData.location}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">Tell us about the category & price</h1>
                <div className="space-y-5 pt-6">
                  <div className="relative">
                     <select 
                        name="category"
                        className="w-full p-5 text-lg border border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none bg-white appearance-none cursor-pointer"
                        onChange={handleChange}
                        value={formData.category}
                      >
                        <option value="Amazing pools">Amazing pools</option>
                        <option value="Beachfront">Beachfront</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Farms">Farms</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-slate-500">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                  </div>
                  
                  <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-400 group-focus-within:text-slate-800 transition-colors">₹</span>
                    <input
                      name="price"
                      type="number"
                      placeholder="Price per night"
                      className="w-full p-5 pl-14 pr-40 text-2xl font-bold border border-slate-200 rounded-2xl focus:border-blue-400 focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:font-normal placeholder:text-lg placeholder:text-slate-400"
                      onChange={handleChange}
                      value={formData.price}
                    />
                    
                    <button
                      type="button"
                      onClick={handleSmartPricing}
                      disabled={isPricingAI}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border border-blue-100 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isPricingAI ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">psychology</span>
                          AI Price
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 pl-2 font-medium">Use AI Price to automatically suggest competitive market pricing.</p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-800">Add a photo and description</h1>
                <div className="space-y-5 pt-6 relative">
                  <input
                    name="image"
                    placeholder="Image URL (Unsplash or Cloudinary)"
                    className="w-full p-5 text-lg border border-slate-200 rounded-2xl focus:border-pink-400 focus:ring-4 focus:ring-pink-50 outline-none transition-all placeholder:text-slate-400"
                    onChange={handleChange}
                    value={formData.image}
                  />
                  
                  <div className="relative">
                    <textarea
                      name="description"
                      rows="6"
                      placeholder="Describe your place (or type short keywords like 'goa, pool, near beach' and click Magic Write ✨)"
                      className="w-full p-5 text-lg border border-slate-200 rounded-2xl focus:border-pink-400 focus:ring-4 focus:ring-pink-50 outline-none transition-all resize-none placeholder:text-slate-400"
                      onChange={handleChange}
                      value={formData.description}
                    />
                    
                    {/* ✨ Magic Write Button */}
                    <button
                      type="button"
                      onClick={handleMagicWrite}
                      disabled={isGeneratingAI}
                      className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-400 to-pink-400 hover:from-blue-500 hover:to-pink-500 text-white px-5 py-2.5 rounded-xl shadow-md font-bold text-sm transition-all active:scale-95 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGeneratingAI ? (
                        <>
                          <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                          Writing...
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                          Magic Write
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 md:px-16 py-4 flex justify-between items-center z-50">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`font-bold text-slate-500 hover:text-slate-800 transition-colors ${step === 1 ? "opacity-0 cursor-default" : "opacity-100"}`}
        >
          Back
        </button>
        {step < totalSteps ? (
          <Button 
            onClick={nextStep}
            className="px-8 py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Publish Listing
          </Button>
        )}
      </footer>
    </div>
  );
};

export default AddProperty;