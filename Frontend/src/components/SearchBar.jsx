import React from "react";

const SearchBar = () => {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex items-center gap-6 border rounded-full px-6 py-3 shadow-md w-[60%]">
        <div>
          <p className="text-sm font-semibold">Where</p>
          <input type="text" placeholder="Search destinations" className="outline-none"/>
        </div>

        <div>
          <p className="text-sm font-semibold">When</p>
          <input type="text" placeholder="Add dates" className="outline-none"/>
        </div>

        <div>
          <p className="text-sm font-semibold">Who</p>
          <input type="text" placeholder="Add guests" className="outline-none"/>
        </div>

        <button className="bg-rose-500 text-white p-3 rounded-full">🔍</button>
      </div>
    </div>
  );
};

export default SearchBar;