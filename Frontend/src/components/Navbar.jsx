import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
  };

  const navLinks = [
    { name: "Rooms", path: "/" },
    { name: "Experiences", path: "/experiences" },
    { name: "AI Planner ✨", path: "/ai-planner" },
  ];

  return (
    // 🌸 AESTHETIC THEME: White Glassmorphism with Soft Border
    <div className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-lg z-[999] shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center px-6 md:px-16 py-4 max-w-[2520px] mx-auto">
        
        {/* 1. Logo Section */}
        <div className="flex justify-start">
          <Link to="/" className="inline-flex items-center gap-2 transition-transform active:scale-95">
            {/* Aesthetic Gradient Logo */}
            <span className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
              LUXE
            </span>
          </Link>
        </div>

        {/* 2. Center Menu */}
        <nav className="hidden md:flex justify-center items-center gap-8 font-semibold text-slate-500">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 transition-colors hover:text-slate-800 ${
                location.pathname === link.path ? "text-slate-900" : ""
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-400 to-pink-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* 3. Right Side */}
        <div ref={menuRef} className="flex justify-end items-center gap-2 md:gap-4 relative text-sm font-semibold text-slate-700">
          
          <button className="md:hidden flex items-center justify-center p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition text-slate-700">
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          {(!user || user?.role === 'admin') && (
            <Link to={user ? "/add-property" : "/login"} className="hidden md:block px-4 py-3 rounded-full hover:bg-slate-50 transition whitespace-nowrap active:scale-95 text-slate-600">
              List your Room
            </Link>
          )}
          
          <div className="hidden md:flex items-center justify-center p-3 rounded-full hover:bg-slate-50 cursor-pointer transition active:scale-90 text-slate-600">
            <span className="material-symbols-outlined text-[22px]">language</span>
          </div>

          {/* User Menu Button */}
          <button
            className="flex items-center gap-3 border border-slate-200 p-2 md:pl-4 md:pr-2 rounded-full hover:shadow-md cursor-pointer transition-all bg-white ml-2 active:scale-95"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-[22px] text-slate-500">menu</span>
            <div className={`bg-slate-100 text-slate-500 rounded-full p-1 flex items-center justify-center ${user?.role === 'admin' ? 'ring-2 ring-blue-400' : ''}`}>
              <span className="material-symbols-outlined text-[24px]">account_circle</span>
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {menuOpen && (
               <motion.div
                 initial={{ opacity: 0, scale: 0.95, y: 10 }}
                 animate={{ opacity: 1, scale: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95, y: 10 }}
                 transition={{ duration: 0.2, ease: "easeOut" }}
                 className="absolute right-0 top-[65px] w-64 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] py-3 flex flex-col z-[110] overflow-hidden"
               >
                 {!user ? (
                   <>
                     <div className="flex flex-col border-b border-slate-100 pb-2">
                       <Link to="/register" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 font-bold text-slate-900 transition-colors">Sign up</Link>
                       <Link to="/login" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 font-medium transition-colors">Log in</Link>
                     </div>
                     <div className="flex flex-col pt-2">
                       <Link to="/help" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 font-medium transition-colors">Help Center</Link>
                     </div>
                   </>
                 ) : (
                   <>
                     <div className="flex flex-col border-b border-slate-100 pb-2">
                       <div className="px-5 py-3 text-[11px] text-slate-400 uppercase tracking-widest font-bold">
                         {user.role === 'admin' ? 'Host Account' : 'Guest Account'}
                       </div>
                       
                       {user.role === 'admin' ? (
                         <>
                           <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-semibold text-slate-800 flex justify-between">
                             Dashboard <span className="material-symbols-outlined text-[18px] text-blue-400">trending_up</span>
                           </Link>
                           <Link to="/my-properties" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">Manage Rooms</Link>
                           <Link to="/add-property" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">List New Room</Link>
                         </>
                       ) : (
                         <>
                           <Link to="/my-bookings" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">Trips</Link>
                           <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">Wishlists</Link>
                         </>
                       )}
                     </div>
                     
                     <div className="flex flex-col pt-2">
                       <Link to="/experiences" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">Host an Experience</Link>
                       <Link to="/help" onClick={() => setMenuOpen(false)} className="px-5 py-3 hover:bg-slate-50 transition-colors font-medium text-slate-700">Help Center</Link>
                       <button onClick={handleLogout} className="px-5 py-3 text-left hover:bg-red-50 transition-colors text-red-500 font-semibold">Log out</button>
                     </div>
                   </>
                 )}
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;