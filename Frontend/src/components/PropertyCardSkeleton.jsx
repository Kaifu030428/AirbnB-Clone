import React from "react";

const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {/* 1. Image Container Skeleton */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 animate-pulse">
        {/* Heart Icon placeholder */}
        <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-gray-300/50" />
        
        {/* Shimmer overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </div>

      {/* 2. Content Skeleton */}
      <div className="flex justify-between items-start pt-1">
        <div className="flex flex-col gap-2 w-full">
          {/* Location Line */}
          <div className="h-4 bg-gray-200 rounded-md w-[60%] animate-pulse" />
          
          {/* Description Line */}
          <div className="h-3 bg-gray-100 rounded-md w-[80%] animate-pulse" />
          
          {/* Dates Line */}
          <div className="h-3 bg-gray-100 rounded-md w-[40%] animate-pulse" />
          
          {/* Price Line */}
          <div className="mt-2 h-5 bg-gray-200 rounded-md w-[30%] animate-pulse" />
        </div>

        {/* Rating Placeholder */}
        <div className="flex items-center gap-1">
          <div className="h-4 w-10 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
};

// Custom Tailwind Animation for Shimmer (Add this in index.css if not working)
// @keyframes shimmer {
//   100% { transform: translateX(100%); }
// }

export default PropertyCardSkeleton;