import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Stays", path: "/" },
    { name: "Experiences", path: "/experiences" },
    { name: "Services", path: "/services" },
  ];

  return (
    // FIX: Using Grid Layout (3 Equal Columns) for perfect centering without overlapping!
    <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-[100] shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center px-6 md:px-16 py-4 max-w-[2520px] mx-auto">
        
        {/* 1. Logo Section (Left Aligned) */}
        <div className="flex justify-start">
          <Link to="/" className="inline-flex items-center gap-1 text-[#FF385C] hover:scale-105 transition-transform active:scale-95">
            <span className="material-symbols-outlined text-4xl">travel_explore</span>
            <span className="text-2xl font-bold hidden lg:block tracking-tighter">airbnb</span>
          </Link>
        </div>

        {/* 2. Center Menu (Center Aligned) */}
        <nav className="hidden md:flex justify-center items-center gap-8 font-medium text-gray-500">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 transition-colors hover:text-black ${
                location.pathname === link.path ? "text-black font-semibold" : ""
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* 3. Right Side (Right Aligned) */}
        <div ref={menuRef} className="flex justify-end items-center gap-2 md:gap-4 relative text-sm font-medium text-gray-800">
          
          <button className="md:hidden flex items-center justify-center p-2 rounded-full border border-gray-300 hover:shadow-md transition bg-white">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <Link to="/add-property" className="hidden md:block px-4 py-3 rounded-full hover:bg-gray-100 transition whitespace-nowrap active:scale-95">
            Airbnb your home
          </Link>
          
          <div className="hidden md:flex items-center justify-center p-3 rounded-full hover:bg-gray-100 cursor-pointer transition active:scale-90">
            <span className="material-symbols-outlined text-[22px]">language</span>
          </div>

          <button
            className="flex items-center gap-3 border border-gray-300 p-2 md:pl-4 md:pr-2 rounded-full hover:shadow-md cursor-pointer transition-all bg-white ml-2 active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-[22px]">menu</span>
            <div className="bg-gray-500 text-white rounded-full p-1 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </div>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-[65px] w-64 bg-white border border-gray-100 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 flex flex-col z-[110] overflow-hidden"
              >
                <div className="flex flex-col border-b border-gray-100 pb-2">
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 font-semibold text-gray-900 transition-colors">Sign up</Link>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 transition-colors">Log in</Link>
                </div>
                <div className="flex flex-col pt-2">
                  <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 transition-colors">Airbnb your home</Link>
                  <Link to="/experiences" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 transition-colors">Host an experience</Link>
                  <Link to="/help" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-50 transition-colors">Help Center</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;