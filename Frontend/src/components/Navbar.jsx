import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center px-8 py-4 shadow-sm sticky top-0 bg-white z-50">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-rose-500">
        airbnb
      </Link>

      {/* Center Menu */}
      <div className="flex gap-8 font-medium">
        <Link
          to="/"
          className={location.pathname === "/" ? "border-b-2 border-black pb-1" : ""}
        >
          Homes
        </Link>

        <Link
          to="/experiences"
          className={location.pathname === "/experiences" ? "border-b-2 border-black pb-1" : ""}
        >
          Experiences
        </Link>

        <Link
          to="/services"
          className={location.pathname === "/services" ? "border-b-2 border-black pb-1" : ""}
        >
          Services
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        <p className="hidden md:block">Become a host</p>

        {/* Hamburger + Profile */}
        <div
          className="flex items-center gap-2 border px-3 py-2 rounded-full shadow-sm cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Hamburger */}
          <div className="space-y-1">
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
          </div>

          {/* Profile circle */}
          <div className="w-7 h-7 bg-gray-400 rounded-full"></div>
        </div>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 top-14 w-40 bg-white border rounded-xl shadow-lg p-2">
            <Link to="/login">
              <p className="p-2 hover:bg-gray-100 rounded-lg">Login</p>
            </Link>
            <Link to="/register">
              <p className="p-2 hover:bg-gray-100 rounded-lg">Sign up</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;