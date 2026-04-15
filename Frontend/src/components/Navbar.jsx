import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

  return (
    <div className="flex justify-between items-center px-6 md:px-10 py-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
      
      {/* Logo */}
      <Link to="/" className="flex items-center gap-1 text-airbnb">
        <span className="material-symbols-outlined text-4xl">travel_explore</span>
        <span className="text-xl font-bold hidden lg:block tracking-tight">airbnb</span>
      </Link>

      {/* Center Menu (Stays / Experiences) */}
      <nav className="hidden md:flex items-center gap-6 font-medium text-gray-500" aria-label="Primary navigation">
        <Link
          to="/"
          className={`hover:text-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb rounded-md px-1 ${location.pathname === "/" ? "text-black font-semibold" : ""}`}
        >
          Stays
        </Link>
        <Link
          to="/experiences"
          className={`hover:text-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb rounded-md px-1 ${location.pathname === "/experiences" ? "text-black font-semibold" : ""}`}
        >
          Experiences
        </Link>
        <Link
          to="/services"
          className={`hover:text-black transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb rounded-md px-1 ${location.pathname === "/services" ? "text-black font-semibold" : ""}`}
        >
          Services
        </Link>
      </nav>

      {/* Right Side */}
      <div ref={menuRef} className="flex items-center gap-2 md:gap-4 relative text-sm font-medium">
        <button
          className="md:hidden flex items-center gap-2 border border-gray-300 px-3 py-2 rounded-full text-gray-700 hover:shadow-md transition"
          aria-label="Quick search"
        >
          <span className="material-symbols-outlined text-[18px]">search</span>
          <span className="text-xs font-semibold">Anywhere</span>
        </button>

        <Link to="/" className="hidden md:block px-4 py-2 rounded-full hover:bg-gray-100 transition whitespace-nowrap">
          Airbnb your home
        </Link>
        
        <div className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
          <span className="material-symbols-outlined text-[20px]">language</span>
        </div>

        {/* Hamburger + Profile */}
        <button
          className="flex items-center gap-3 border border-gray-300 px-3 py-2 rounded-full hover:shadow-md cursor-pointer transition-shadow bg-white ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open profile menu"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
        >
          <span className="material-symbols-outlined text-[20px] text-gray-500">menu</span>
          <span className="material-symbols-outlined text-[30px] text-gray-400">account_circle</span>
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            className="absolute right-0 top-[60px] w-60 bg-white border border-gray-200 rounded-2xl shadow-xl py-2 flex flex-col z-50 text-sm animate-fade-in"
            role="menu"
            aria-label="Profile menu"
          >
            <Link to="/register" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb">
              Sign up
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb">
              Log in
            </Link>
            <div className="h-[1px] bg-gray-200 my-1 w-full scale-y-50"></div>
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb">
              Airbnb your home
            </Link>
            <Link to="/" onClick={() => setMenuOpen(false)} className="px-4 py-3 hover:bg-gray-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-airbnb">
              Help Center
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;