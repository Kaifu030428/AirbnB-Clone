import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault(); 
    const toastId = toast.loading("Creating your account...");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      
      // Tumhare backend ke response ke hisaab se check kar rahe hain
      if (response.data.success || response.data.message === "User registered successfully") {
        toast.success("Account created successfully! Please login.", { id: toastId });
        navigate("/login"); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", { id: toastId });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center px-6 py-20 min-h-[85vh] bg-gray-50/30"
    >
      <Card className="w-full max-w-[480px] p-8 shadow-2xl border-none rounded-3xl bg-white">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Finish signing up</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Join the ArBn community today.</p>
        </div>

        {/* 👈 FIX: handleRegister function ko yahan attach kiya */}
        <form className="space-y-0" onSubmit={handleRegister}>
          <div className="border border-gray-400 rounded-xl overflow-hidden mb-2">
            
            <div className="border-b border-gray-400 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Full Name</label>
              <input
                type="text"
                name="name" // 👈 FIX
                value={formData.name} // 👈 FIX
                onChange={handleChange} // 👈 FIX
                placeholder="MD KAIF"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>

            <div className="border-b border-gray-400 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Email</label>
              <input
                type="email"
                name="email" // 👈 FIX
                value={formData.email} // 👈 FIX
                onChange={handleChange} // 👈 FIX
                placeholder="email@example.com"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>

            {/* 👈 FIX: Phone number ka input add kiya */}
            <div className="border-b border-gray-400 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>

            <div className="p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Password</label>
              <input
                type="password"
                name="password" // 👈 FIX
                value={formData.password} // 👈 FIX
                onChange={handleChange} // 👈 FIX
                placeholder="Create a password"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>

          </div>

          <p className="text-[11px] text-gray-500 mb-6 leading-tight">
            We'll email you to confirm your email address. Standard messaging and data rates apply. 
            <span className="font-bold underline cursor-pointer ml-1">Privacy Policy</span>
          </p>

          <Button type="submit" className="w-full py-3.5 bg-[#FF385C] hover:bg-[#D70466] text-white rounded-xl text-md font-bold shadow-md transition-all active:scale-[0.98]">
            Agree and continue
          </Button>
        </form>

        <div className="flex items-center my-6 gap-4">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-400 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
        </div>

        <p className="text-center mt-8 text-[13px] text-gray-600 font-light">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-bold hover:underline underline-offset-4">
            Log in
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Register;