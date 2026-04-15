import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const barRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const guestString = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : "Add guests";

  const runSearch = () => {
    const params = new URLSearchParams();
    const cleanedQuery = searchQuery.trim();

    if (cleanedQuery) {
      params.set("q", cleanedQuery);
    }
    if (totalGuests > 0) {
      params.set("guests", String(totalGuests));
    }

    navigate(`/search?${params.toString()}`);
    setActiveTab(null);
  };

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const current = prev[type];
      const next = operation === 'add' ? current + 1 : current - 1;
      if (next < 0) return prev;
      return { ...prev, [type]: next };
    });
  };

  const regionOptions = [
    {
      label: "I am flexible",
      image:
        "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "Europe",
      image:
        "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "United Kingdom",
      image:
        "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "Southeast Asia",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "Middle East",
      image:
        "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=300&q=80",
    },
    {
      label: "United States",
      image:
        "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=300&q=80",
    },
  ];

  return (
    <>
      {activeTab && (
        <button
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setActiveTab(null)}
          aria-label="Close search options"
        ></button>
      )}

      <div className="flex justify-center mt-6 z-20 relative px-4 md:px-0" ref={barRef}>
        <button
          className="md:hidden w-full max-w-lg flex items-center justify-between border border-gray-300 rounded-full bg-white px-4 py-3 shadow-md hover:shadow-lg transition"
          onClick={() => {
            if (activeTab) {
              runSearch();
            } else {
              setActiveTab("where");
            }
          }}
          aria-expanded={Boolean(activeTab)}
          aria-label="Open search panel"
        >
          <div className="text-left">
            <p className="text-sm font-semibold text-gray-900">{searchQuery || "Where to?"}</p>
            <p className="text-xs text-gray-500">Anywhere · Any week · Add guests</p>
          </div>
          <span className="material-symbols-outlined bg-airbnb text-white rounded-full p-2 text-lg">search</span>
        </button>

        <div className={`hidden md:flex items-center bg-white border border-gray-200 rounded-full transition-all duration-300 ${activeTab ? 'shadow-xl bg-gray-100' : 'shadow-md hover:shadow-lg'}`}>
          <div
            onClick={() => setActiveTab('where')}
            className={`flex flex-col px-8 py-3 rounded-full cursor-pointer transition text-left ${activeTab === 'where' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
            role="button"
            tabIndex={0}
            aria-expanded={activeTab === "where"}
          >
            <p className="text-xs font-bold text-gray-800 tracking-wide">Where</p>
            <input
              type="text"
              placeholder="Search destinations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runSearch();
                }
              }}
              className="outline-none bg-transparent text-sm placeholder-gray-400 w-32 truncate"
            />
          </div>

          <div className="h-8 w-[1px] bg-gray-300"></div>

          <div
             onClick={() => setActiveTab('when')}
             className={`flex flex-col px-8 py-3 rounded-full cursor-pointer transition text-left ${activeTab === 'when' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
             role="button"
             tabIndex={0}
             aria-expanded={activeTab === "when"}
          >
            <p className="text-xs font-bold text-gray-800 tracking-wide">When</p>
            <input
              type="text"
              placeholder="Add dates"
              className="outline-none bg-transparent text-sm placeholder-gray-400 w-24 truncate cursor-pointer"
              readOnly
            />
          </div>

          <div className="h-8 w-[1px] bg-gray-300"></div>

          <div
            onClick={() => setActiveTab('who')}
            className={`flex items-center pl-8 pr-2 py-2 rounded-full cursor-pointer transition ${activeTab === 'who' ? 'bg-white shadow-md' : 'hover:bg-gray-200'}`}
            role="button"
            tabIndex={0}
            aria-expanded={activeTab === "who"}
          >
            <div className="flex flex-col mr-4 min-w-[90px] text-left">
              <p className="text-xs font-bold text-gray-800 tracking-wide">Who</p>
              <input
                type="text"
                placeholder={guestString}
                value={totalGuests > 0 ? guestString : ''}
                readOnly
                className="outline-none bg-transparent text-sm placeholder-gray-400 w-full truncate cursor-pointer"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(null);
                if (searchQuery || totalGuests > 0) {
                  runSearch();
                } else {
                  runSearch();
                }
              }}
              className="bg-airbnb hover:bg-airbnb-dark text-white p-3 rounded-full flex items-center justify-center transition-colors shadow-md z-30 relative"
              aria-label="Search properties"
            >
              <span className="material-symbols-outlined text-lg font-bold">search</span>
            </button>
          </div>
        </div>

        {/* --- POPOVERS --- */}
        
        {/* Where Dropdown */}
        {activeTab === 'where' && (
          <div className="absolute top-[80px] left-0 md:left-[10%] w-[95vw] max-w-[400px] bg-white rounded-[32px] shadow-xl p-6 md:p-8 z-30 animate-fade-in">
            <h3 className="font-bold text-sm mb-4">Search by region</h3>
            <div className="grid grid-cols-3 gap-y-6 gap-x-2">
              {regionOptions.map((region) => (
                <button
                  key={region.label}
                  type="button"
                  className="flex flex-col gap-2 cursor-pointer group text-left"
                  onClick={() => {
                    setSearchQuery(region.label);
                    runSearch();
                  }}
                >
                  <img
                    src={region.image}
                    alt={region.label}
                    className="w-full aspect-square object-cover rounded-xl border border-gray-200 group-hover:border-black transition"
                  />
                  <span className="text-sm text-gray-600">{region.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* When Dropdown (Mock) */}
        {activeTab === 'when' && (
          <div className="absolute top-[80px] left-1/2 -translate-x-1/2 md:left-[20%] md:translate-x-0 w-[95vw] max-w-[350px] bg-white rounded-[32px] shadow-xl p-8 z-30 flex flex-col items-center animate-fade-in">
            <p className="font-semibold text-lg mb-2">Flexible Dates Mock</p>
            <span className="material-symbols-outlined text-gray-300 text-[60px] mb-4">calendar_month</span>
            <p className="text-sm text-gray-500 text-center">Calendar UI would go here.<br/>Select your dates.</p>
          </div>
        )}

        {/* Who Dropdown */}
        {activeTab === 'who' && (
          <div className="absolute top-[80px] right-0 md:right-[5%] w-[95vw] max-w-[350px] bg-white rounded-[32px] shadow-xl p-6 z-30 animate-fade-in">
            {[{ type: 'adults', title: 'Adults', sub: 'Ages 13 or above' }, { type: 'children', title: 'Children', sub: 'Ages 2-12' }, { type: 'infants', title: 'Infants', sub: 'Under 2' }, { type: 'pets', title: 'Pets', sub: 'Bringing a service animal?' }].map((guest, idx) => (
              <div key={idx} className={`flex justify-between items-center py-4 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                <div>
                  <h3 className="font-semibold text-gray-800">{guest.title}</h3>
                  <p className="text-sm text-gray-500">{guest.sub}</p>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => handleGuestChange(guest.type, 'subtract')} disabled={guests[guest.type] === 0} className={`w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center ${guests[guest.type] === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-black text-gray-500'}`}>
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="w-4 text-center">{guests[guest.type]}</span>
                  <button onClick={() => handleGuestChange(guest.type, 'add')} className="w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center hover:border-black text-gray-500">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </>
  );
};

export default SearchBar;