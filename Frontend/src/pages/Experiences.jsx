import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";

const Experiences = () => {
  const experienceItems = [
    { 
      title: "Food Walk", 
      detail: "Explore local cuisine with chefs", 
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      price: "₹1,500"
    },
    { 
      title: "City Photo Tour", 
      detail: "Golden-hour landmarks with a pro", 
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      price: "₹2,200"
    },
    { 
      title: "Art & Craft", 
      detail: "Hands-on sessions with local artists", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80",
      price: "₹800"
    },
    { 
      title: "Secret Jazz Club", 
      detail: "Live music in an underground setting", 
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      price: "₹3,000"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-12">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900"
        >
          Experiences
        </motion.h1>
        <p className="mt-4 text-xl text-gray-500 font-light max-w-2xl">
          Unique activities led by local hosts, designed to take you deeper into the world.
        </p>
      </header>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {experienceItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="relative group cursor-pointer h-[400px] overflow-hidden rounded-2xl shadow-lg"
          >
            {/* Background Image */}
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
              
              <div className="overflow-hidden">
                <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {item.detail}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-white">
                <span className="font-semibold">{item.price} <span className="font-light text-sm">/ person</span></span>
                <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold transform translate-x-20 group-hover:translate-x-0 transition-transform duration-500">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="mt-20 bg-gray-900 rounded-[32px] p-8 md:p-16 text-center text-white overflow-hidden relative">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 italic">Host an experience</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Earn money by sharing your passions and culture with travelers from around the world.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all">
            Learn more
          </button>
        </div>
        {/* Abstract background blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-rose-500 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>
      </section>
    </div>
  );
};

export default Experiences;