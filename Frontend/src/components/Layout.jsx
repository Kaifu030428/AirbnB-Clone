import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Helper component taaki naye page par hamesha top se shuru ho
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-900 bg-white selection:bg-[#FF385C] selection:text-white">
      <ScrollToTop />
      
      {/* Global Toast Configuration (Airbnb Style - Black & White) */}
      <Toaster 
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#222222',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          },
          success: { iconTheme: { primary: '#fff', secondary: '#222' } }
        }}
      />

      <Navbar />

      {/* Main Content Area with Smooth Page Transitions */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} // Custom easing for premium feel
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;