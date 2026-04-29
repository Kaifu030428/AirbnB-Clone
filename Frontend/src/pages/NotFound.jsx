import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
      </motion.div>
      <h2 className="text-3xl font-bold text-gray-900 mt-4">We can't seem to find the page you're looking for.</h2>
      <p className="text-gray-500 mt-4 max-w-md mx-auto">
        Here are some helpful links instead:
      </p>
      <div className="mt-8">
        <Link 
          to="/" 
          className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg"
        >
          Take me home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
