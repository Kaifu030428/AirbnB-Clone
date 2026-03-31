import PropertyCard from "../components/PropertyCard";

const Home = () => {
  const properties = [
    {
      id: 1,
      name: "Beach House",
      location: "Goa",
      price: 2500,
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Mountain View",
      location: "Manali",
      price: 1800,
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold mb-6">Explore Places</h1>

      <div className="flex gap-6 flex-wrap">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Home;