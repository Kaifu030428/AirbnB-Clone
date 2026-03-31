import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`}>
      <div className="w-64 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          <h2 className="text-lg font-semibold">{property.name}</h2>
          <p className="text-gray-500">{property.location}</p>
          <p className="text-rose-500 font-bold">₹ {property.price} / night</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;