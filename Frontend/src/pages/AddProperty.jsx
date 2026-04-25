import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = () => {
    console.log("Property Data Submitted:", formData);
    alert("Property listed successfully! (Backend se connect hone par database mein chala jayega)");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-[80px] left-0 w-full h-2 bg-gray-100 z-50">
        <motion.div 
          className="h-full bg-black" 
          initial={{ width: "0%" }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6 py-20">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h1 className="text-3xl md:text-4xl font-semibold">Where is your place located?</h1>
                <p className="text-gray-500">Guests will only get your exact address after they book a reservation.</p>
                <div className="space-y-4 pt-6">
                  <input
                    name="title"
                    placeholder="Property Title (e.g. Modern Beachfront Villa)"
                    className="w-full p-6 text-lg border border-gray-300 rounded-xl focus:border-black outline-none transition"
                    onChange={handleChange}
                    value={formData.title}
                  />
                  <input
                    name="location"
                    placeholder="City, State, Country"
                    className="w-full p-6 text-lg border border-gray-300 rounded-xl focus:border-black outline-none transition"
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
                <h1 className="text-3xl md:text-4xl font-semibold">Tell us about the category & price</h1>
                <div className="space-y-4 pt-6">
                  <select 
                    name="category"
                    className="w-full p-6 text-lg border border-gray-300 rounded-xl focus:border-black outline-none bg-transparent"
                    onChange={handleChange}
                    value={formData.category}
                  >
                    <option value="Amazing pools">Amazing pools</option>
                    <option value="Beachfront">Beachfront</option>
                    <option value="Cabins">Cabins</option>
                    <option value="Farms">Farms</option>
                  </select>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-semibold">₹</span>
                    <input
                      name="price"
                      type="number"
                      placeholder="Price per night"
                      className="w-full p-6 pl-12 text-3xl font-bold border border-gray-300 rounded-xl focus:border-black outline-none transition"
                      onChange={handleChange}
                      value={formData.price}
                    />
                  </div>
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
                <h1 className="text-3xl md:text-4xl font-semibold">Add a photo and description</h1>
                <div className="space-y-4 pt-6">
                  <input
                    name="image"
                    placeholder="Image URL (Unsplash or Cloudinary)"
                    className="w-full p-6 text-lg border border-gray-300 rounded-xl focus:border-black outline-none transition"
                    onChange={handleChange}
                    value={formData.image}
                  />
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Describe your place..."
                    className="w-full p-6 text-lg border border-gray-300 rounded-xl focus:border-black outline-none transition resize-none"
                    onChange={handleChange}
                    value={formData.description}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 md:px-16 py-4 flex justify-between items-center z-50">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`font-semibold underline ${step === 1 ? "opacity-0" : "opacity-100"}`}
        >
          Back
        </button>
        {step < totalSteps ? (
          <Button 
            onClick={nextStep}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-black"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            className="px-8 py-3 bg-[#FF385C] text-white rounded-lg"
          >
            Publish Listing
          </Button>
        )}
      </footer>
    </div>
  );
};

export default AddProperty;