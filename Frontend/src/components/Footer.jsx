import React from "react";

const Footer = () => {
  const footerSections = [
    {
      title: "Support",
      links: ["Help Centre", "AirCover", "Anti-discrimination", "Disability support", "Cancellation options"],
    },
    {
      title: "Hosting",
      links: ["Airbnb your home", "AirCover for Hosts", "Hosting resources", "Community forum", "Hosting responsibly"],
    },
    {
      title: "Airbnb",
      links: ["Newsroom", "New features", "Careers", "Investors", "Gift cards"],
    },
  ];

  return (
    <footer className="bg-[#F7F7F7] border-t border-gray-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* 1. Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gray-200">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-600 hover:underline font-light transition-all">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 2. Bottom Bar (Copyright & Tools) */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-[14px] text-gray-700">
            <p>© 2026 ArBn, Inc.</p>
            <span className="hidden md:inline">·</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>
          </div>

          {/* Social & Language Preferences */}
          <div className="flex items-center gap-6 font-semibold text-sm text-gray-900">
            <button className="flex items-center gap-2 hover:bg-gray-200/50 p-1 rounded-lg transition">
              <span className="material-symbols-outlined text-lg">language</span>
              <span>English (IN)</span>
            </button>
            <button className="flex items-center gap-2 hover:bg-gray-200/50 p-1 rounded-lg transition">
              <span>₹ INR</span>
            </button>
            
            {/* Social Icons Placeholder */}
            <div className="hidden md:flex items-center gap-4 ml-4">
              <span className="material-symbols-outlined text-xl cursor-pointer hover:text-gray-600">facebook</span>
              <span className="material-symbols-outlined text-xl cursor-pointer hover:text-gray-600">share</span>
              <span className="material-symbols-outlined text-xl cursor-pointer hover:text-gray-600">camera_alt</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;