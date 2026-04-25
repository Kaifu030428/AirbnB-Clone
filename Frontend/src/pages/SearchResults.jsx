import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';

const SearchResults = ({ searchQuery }) => {
  const results = [
    { id: 1, name: 'Cozy Cottage', location: 'New York', price: 120, image: '/path/to/image1.jpg' },
    { id: 2, name: 'Modern Apartment', location: 'Los Angeles', price: 200, image: '/path/to/image2.jpg' },
  ];

  return (
    <div>
      <Navbar />
      <main>
        <h1>Search Results for "{searchQuery}"</h1>
        <div className="property-list">
          {results.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;