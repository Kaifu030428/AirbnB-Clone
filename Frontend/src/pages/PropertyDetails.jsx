import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PropertyDetails = () => {
  const property = {
    name: 'Cozy Cottage',
    location: 'New York',
    price: 120,
    description: 'A cozy cottage in the heart of New York.',
    image: '/path/to/image1.jpg',
  };

  return (
    <div>
      <Navbar />
      <main>
        <h1>{property.name}</h1>
        <img src={property.image} alt={property.name} />
        <p>{property.description}</p>
        <p>Location: {property.location}</p>
        <p>Price: ${property.price} / night</p>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;