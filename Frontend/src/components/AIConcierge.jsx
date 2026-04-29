import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";

const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "model", text: "Hello! I am your LUXE AI Concierge. How can I assist you in planning your next luxury getaway today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Send history so AI has context
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      const response = await axios.post("http://localhost:8000/api/ai/chat", {
        message: userMessage.text,
        history: history
      });

      if (response.data.success) {
        setMessages(prev => [...prev, { role: "model", text: response.data.reply }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", text: "I'm currently offline. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (text) => {
    // Basic parser for Markdown links like [Text](/url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    
    text.replace(linkRegex, (match, p1, p2, index) => {
      // Push text before the link
      if (index > lastIndex) {
        parts.push(text.substring(lastIndex, index));
      }
      
      // Push the parsed Link component
      parts.push(
        <Link 
          key={index} 
          to={p2} 
          onClick={() => setIsOpen(false)}
          className="font-bold underline text-[#D4AF37] hover:text-black transition-colors bg-[#D4AF37]/10 px-1 rounded inline-block my-1"
        >
          {p1}
        </Link>
      );
      lastIndex = index + match.length;
    });
    
    // Push remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-[#111] border-2 border-[#D4AF37] rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center z-[9999] group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="material-symbols-outlined text-[#D4AF37] text-3xl">auto_awesome</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[550px] max-h-[85vh] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-200 z-[10000] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#111] p-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#222] border border-[#D4AF37]/30 flex items-center justify-center relative">
                  <span className="material-symbols-outlined text-[#D4AF37]">support_agent</span>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]"></div>
                </div>
                <div>
                  <h3 className="text-white font-serif font-bold leading-tight">LUXE Concierge</h3>
                  <p className="text-[#D4AF37] text-[10px] uppercase tracking-wider font-semibold">AI Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#222] text-gray-400 hover:text-white hover:bg-[#333] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-3 text-sm shadow-sm whitespace-pre-wrap ${
                      msg.role === "user" 
                        ? "bg-[#111] text-white rounded-br-sm" 
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm leading-relaxed"
                    }`}
                  >
                    {msg.role === "model" ? formatMessage(msg.text) : msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for travel recommendations..."
                  className="w-full bg-gray-100 border border-transparent focus:border-gray-300 focus:bg-white rounded-full py-3 pl-4 pr-12 text-sm outline-none transition-all"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 w-10 h-10 flex items-center justify-center bg-[#111] hover:bg-black text-[#D4AF37] rounded-full disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-gray-400">Powered by Google Gemini ✨</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIConcierge;
