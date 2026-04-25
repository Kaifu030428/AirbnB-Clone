import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const Login = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center px-6 py-20 min-h-[85vh] bg-gray-50/30"
    >
      <Card className="w-full max-w-[450px] p-8 shadow-2xl border-none rounded-3xl bg-white">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Log in</h2>
          <p className="text-sm text-gray-500 mt-1 font-light">Welcome back to ArBn</p>
        </div>

        <form className="space-y-0" onSubmit={(e) => e.preventDefault()}>
          {/* Input Group - Airbnb Signature Style */}
          <div className="border border-gray-400 rounded-xl overflow-hidden mb-5">
            <div className="border-b border-gray-400 p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>
            <div className="p-3 focus-within:bg-gray-50 transition-colors">
              <label className="block text-[10px] font-bold uppercase text-gray-600">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full text-sm outline-none bg-transparent pt-1 placeholder:text-gray-300"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3.5 bg-[#FF385C] hover:bg-[#D70466] text-white rounded-xl text-md font-bold shadow-md transition-all active:scale-[0.98]">
            Continue
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
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-900 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-900 p-3 rounded-xl hover:bg-gray-50 transition font-semibold text-sm">
            <span className="material-symbols-outlined text-xl">apple</span>
            Continue with Apple
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-8 text-[13px] text-gray-600 font-light">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-bold hover:underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </Card>
    </motion.div>
  );
};

export default Login;