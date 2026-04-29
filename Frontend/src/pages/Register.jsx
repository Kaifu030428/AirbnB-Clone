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
    role: "guest", // Default role
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleRegister = async (e) => {
    e.preventDefault(); 
    const toastId = toast.loading("Processing your application...");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", formData, {
        withCredentials: true,
      });
      
      if (response.data.success || response.data.message === "User registered successfully") {
        toast.success("Application successful! Please login.", { id: toastId });
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
          <h2 className="text-2xl font-bold text-[#111] font-serif">Apply for Membership</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Join the exclusive LUXE network today.</p>
        </div>

        {/* Role Selection Toggle */}
        <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => handleRoleChange('guest')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              formData.role === 'guest' 
                ? 'bg-white shadow-sm text-[#111]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I want to Book Stays
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              formData.role === 'admin' 
                ? 'bg-[#111] shadow-sm text-[#D4AF37]' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            I want to Host / Partner
          </button>
        </div>

        <form className="space-y-0" onSubmit={handleRegister}>
          <div className="border border-gray-300 rounded-xl overflow-hidden mb-2">
            
            <div className="border-b border-gray-300 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-500">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300 text-[#111]"
                required
              />
            </div>

            <div className="border-b border-gray-300 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300 text-[#111]"
                required
              />
            </div>

            <div className="border-b border-gray-300 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-500">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300 text-[#111]"
                required
              />
            </div>

            <div className="p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-500">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300 text-[#111]"
                required
              />
            </div>

          </div>

          <p className="text-[11px] text-gray-500 mb-6 leading-tight">
            We'll email you to confirm your email address. Standard messaging and data rates apply. 
            <span className="font-bold underline cursor-pointer ml-1 text-[#D4AF37]">Privacy Policy</span>
          </p>

          <Button type="submit" className="w-full py-3.5 bg-[#111] hover:bg-black text-[#D4AF37] rounded-xl text-md font-bold shadow-md transition-all active:scale-[0.98]">
            {formData.role === 'admin' ? "Apply as Partner" : "Join as Member"}
          </Button>
        </form>

        <div className="flex items-center my-6 gap-4">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-[#111]">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-8 text-[13px] text-gray-600 font-light">
          Already a member?{" "}
          <Link to="/login" className="text-[#111] font-bold hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Register;