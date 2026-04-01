import React from "react";
import PropertyCard from "./PropertyCard";

const PropertyRow = ({ title }) => {
  return (
    <div className="px-8 mt-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="flex gap-6 overflow-x-scroll no-scrollbar">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
};

export default PropertyRow;