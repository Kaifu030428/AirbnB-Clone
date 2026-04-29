import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", formData, {
        withCredentials: true,
      });

      if (response.data.success || response.data.message === "Login successful") {
        toast.success("Logged in successfully!", { id: toastId });
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed", { id: toastId });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center px-6 py-20 min-h-[85vh] bg-gray-50/30"
    >
      <Card className="w-full max-w-[450px] p-8 shadow-2xl border-none rounded-3xl bg-white">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#111] font-serif">Member Sign In</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Welcome back to the LUXE network.</p>
        </div>

        <form className="space-y-0" onSubmit={handleLogin}>
          {/* Input Group */}
          <div className="border border-gray-300 rounded-xl overflow-hidden mb-5">
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
            <div className="p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-500">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300 text-[#111]"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3.5 bg-[#111] hover:bg-black text-[#D4AF37] rounded-xl text-md font-bold shadow-md transition-all active:scale-[0.98]">
            Sign in
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 gap-4">
          <div className="h-[1px] bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="h-[1px] bg-gray-200 flex-1"></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-[#111]">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm text-[#111]">
            <span className="material-symbols-outlined text-xl">apple</span>
            Continue with Apple
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-[13px] text-gray-600 font-light">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#111] font-bold hover:underline underline-offset-4">
            Apply for Membership
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Login;