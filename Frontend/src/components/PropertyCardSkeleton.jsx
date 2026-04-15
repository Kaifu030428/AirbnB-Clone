import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="aspect-square w-full rounded-2xl bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 rounded bg-gray-200 w-3/4" />
        <div className="h-4 rounded bg-gray-200 w-2/3" />
        <div className="h-4 rounded bg-gray-200 w-1/2" />
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;
