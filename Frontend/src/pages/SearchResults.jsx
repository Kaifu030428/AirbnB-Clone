import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";
  const guests = Number(searchParams.get("guests") ?? 0);
  const minPrice = Number(searchParams.get("minPrice") ?? 0);
  const maxPrice = Number(searchParams.get("maxPrice") ?? 0);
  const minRating = Number(searchParams.get("minRating") ?? 0);
  const city = searchParams.get("city")?.trim() ?? "";

  const cities = useMemo(() => {
    return [...new Set(properties.map((property) => property.location.split(",")[0].trim()))];
  }, []);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);

    if (!value || value === "all" || value === 0) {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }

    setSearchParams(next);
  };

  const filteredResults = useMemo(() => {
    const normalized = query.toLowerCase();
    return properties.filter((property) => {
      const matchesQuery =
        !normalized ||
        property.location.toLowerCase().includes(normalized) ||
        property.title.toLowerCase().includes(normalized) ||
        property.description.toLowerCase().includes(normalized);

      const matchesMinPrice = minPrice === 0 || property.price >= minPrice;
      const matchesMaxPrice = maxPrice === 0 || property.price <= maxPrice;
      const matchesRating = minRating === 0 || property.rating >= minRating;
      const matchesCity = !city || property.location.toLowerCase().includes(city.toLowerCase());

      return matchesQuery && matchesMinPrice && matchesMaxPrice && matchesRating && matchesCity;
    });
  }, [query, minPrice, maxPrice, minRating, city]);

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        Search results
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
          {query ? `Destination: ${query}` : "Destination: Anywhere"}
        </span>
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
          Guests: {guests > 0 ? guests : "Any"}
        </span>
        {city && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">City: {city}</span>}
        {minPrice > 0 && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Min ₹{minPrice.toLocaleString("en-IN")}</span>}
        {maxPrice > 0 && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Max ₹{maxPrice.toLocaleString("en-IN")}</span>}
        {minRating > 0 && <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full">Rating {minRating}+</span>}
      </div>

      <div className="mt-6 border border-gray-200 rounded-2xl p-4 md:p-5 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="number"
            min="0"
            value={minPrice || ""}
            onChange={(e) => updateParam("minPrice", Number(e.target.value || 0))}
            placeholder="Min price"
            className="border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-airbnb"
          />
          <input
            type="number"
            min="0"
            value={maxPrice || ""}
            onChange={(e) => updateParam("maxPrice", Number(e.target.value || 0))}
            placeholder="Max price"
            className="border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-airbnb"
          />
          <select
            value={minRating || ""}
            onChange={(e) => updateParam("minRating", Number(e.target.value || 0))}
            className="border border-gray-300 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-airbnb bg-white"
          >
            <option value="">Any rating</option>
            <option value="4.5">4.5+</option>
            <option value="4.6">4.6+</option>
            <option value="4.7">4.7+</option>
            <option value="4.8">4.8+</option>
          </select>
          <button
            onClick={() => {
              const next = new URLSearchParams(searchParams);
              next.delete("city");
              next.delete("minPrice");
              next.delete("maxPrice");
              next.delete("minRating");
              setSearchParams(next);
            }}
            className="border border-gray-300 rounded-xl px-3 py-2.5 hover:bg-gray-50 transition"
          >
            Clear filters
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => updateParam("city", "")}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              !city ? "bg-gray-900 text-white border-gray-900" : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            All cities
          </button>
          {cities.map((cityName) => (
            <button
              key={cityName}
              onClick={() => updateParam("city", cityName)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                city.toLowerCase() === cityName.toLowerCase()
                  ? "bg-gray-900 text-white border-gray-900"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-gray-600">
        {filteredResults.length} stay{filteredResults.length !== 1 ? "s" : ""} found.
      </p>

      {filteredResults.length === 0 ? (
        <div className="mt-8 border border-gray-200 rounded-3xl p-8 bg-white max-w-xl">
          <h2 className="text-xl font-semibold text-gray-900">No matches found</h2>
          <p className="text-gray-600 mt-2">
            Try another destination or broaden your search terms.
          </p>
          <Link
            to="/"
            className="inline-flex mt-5 bg-airbnb text-white px-4 py-2 rounded-xl hover:bg-airbnb-dark transition"
          >
            Back to home
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-10">
          {filteredResults.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;