import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const regions = [
    { name: "I'm flexible", img: "https://a0.muscache.com/pictures/f9ec8a23-ed44-420b-83e5-10ff1f071a13.jpg" },
    { name: "Southeast Asia", img: "https://a0.muscache.com/im/pictures/d77de976-2c50-4505-a400-d39d75d3455a.jpg" },
    { name: "India", img: "https://a0.muscache.com/im/pictures/663332ea-a99a-4649-b033-0f9bc48956b9.jpg" },
  ];

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      toast("Listening...", { icon: "🎙️", duration: 2000 });
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setLocation(transcript);
      
      const toastId = toast.loading("AI is analyzing your voice request...");
      
      try {
        const response = await axios.post("http://localhost:8000/api/ai/voice-search", { transcript });
        if (response.data.success) {
          const { location: aiLocation, category: aiCategory } = response.data.filters;
          toast.success("AI found the perfect match!", { id: toastId });
          
          let query = `/?`;
          if (aiLocation) query += `location=${aiLocation}&`;
          if (aiCategory) query += `category=${aiCategory}`;
          
          navigate(query);
        }
      } catch (error) {
        toast.error("Failed to process voice command.", { id: toastId });
      } finally {
        setIsListening(false);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      toast.error("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative flex justify-center w-full bg-transparent pb-4 z-[100]">
      <div className={`relative flex items-center border border-gray-200 rounded-full shadow-md hover:shadow-lg transition-all ${isExpanded ? "bg-white" : "bg-white/80 backdrop-blur-md"}`}>
        
        {/* Destination Input */}
        <div 
          className="flex flex-col px-8 py-3 cursor-pointer rounded-full hover:bg-gray-50 transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <label className="text-[10px] font-bold uppercase text-gray-800">Where</label>
          <input 
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent outline-none text-sm placeholder:text-gray-400 text-black"
          />
        </div>

        <div className="h-8 w-[1px] bg-gray-200" />

        {/* AI Voice Search Button */}
        <div className="px-2">
          <button 
            onClick={handleVoiceSearch}
            className={`p-2 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-gray-100 text-gray-600'}`}
            title="AI Voice Search"
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>

        {/* Search Button */}
        <div className="pr-2">
            <button 
                onClick={() => navigate(`/?location=${location}`)}
                className="bg-[#D4AF37] hover:bg-[#b5952f] text-black p-3 rounded-full flex items-center gap-2 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)]"
            >
                <span className="material-symbols-outlined text-sm font-bold">search</span>
                {isExpanded && <span className="text-sm font-bold pr-2">Search</span>}
            </button>
        </div>

        {/* Region Dropdown - FIXED POSITIONING */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 20, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-2 w-[400px] bg-white border border-gray-200 rounded-[32px] p-8 shadow-2xl z-[110]"
            >
              <p className="text-sm font-bold mb-5">Search by region</p>
              <div className="grid grid-cols-3 gap-4">
                {regions.map((r) => (
                  <div 
                    key={r.name} 
                    className="cursor-pointer group"
                    onClick={() => { setLocation(r.name); setIsExpanded(false); }}
                  >
                    <img src={r.img} className="rounded-xl border border-gray-200 group-hover:border-black transition-all mb-2" alt="" />
                    <p className="text-xs text-gray-700">{r.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;