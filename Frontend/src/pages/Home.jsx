import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";
import PropertyCardSkeleton from "../components/PropertyCardSkeleton";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="border-b border-gray-100 pb-6 w-full">
        <SearchBar />
      </div>

      <div className="sticky top-[81px] bg-white z-40">
        <Categories />
      </div>

      <section className="px-6 md:px-10 pt-8 pb-4">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          Find your next stay
        </h1>
        <p className="mt-2 text-gray-600">
          Handpicked spaces with seamless booking and transparent pricing.
        </p>
      </section>

      <div className="px-6 md:px-10 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
      </div>
    </div>
  );
};

export default Home;