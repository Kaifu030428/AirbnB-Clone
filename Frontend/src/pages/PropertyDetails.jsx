import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();

  const pricePerNight = 10000;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return diff / (1000 * 60 * 60 * 24);
  };

  const nights = calculateNights();
  const totalPrice = nights * pricePerNight;

  const navigate = useNavigate();

const handleReserve = () => {
  if (!checkIn || !checkOut) {
    alert("Please select dates");
    return;
  }

  navigate(`/booking/${id}`, {
    state: {
      checkIn,
      checkOut,
      guests,
      totalPrice,
    },
  });
};

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold mb-2">
        Luxury Villa in Goa
      </h1>
      <p className="text-gray-500 mb-4">⭐ 4.8 · Goa, India</p>

      <div className="grid grid-cols-3 gap-10">
        
        {/* LEFT */}
        <div className="col-span-2">
          <img
            src="https://images.unsplash.com/photo-1568605114967-8130f3a36994"
            className="rounded-xl w-full h-[400px] object-cover"
          />
        </div>

        {/* RIGHT BOOKING */}
        <div className="border p-4 rounded-xl shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">
            ₹{pricePerNight} / night
          </h2>

          {/* Date Inputs */}
          <div className="border rounded-lg overflow-hidden mb-3">
            <div className="flex">
              <input
                type="date"
                className="w-1/2 p-2 outline-none border-r"
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <input
                type="date"
                className="w-1/2 p-2 outline-none"
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <div className="border-t">
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>
          </div>

          {/* Price Calculation */}
          <div className="mb-3 text-sm">
            <p>₹{pricePerNight} × {nights} nights</p>
            <p className="font-semibold">Total: ₹{totalPrice}</p>
          </div>

          <button
  onClick={handleReserve}
  className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition"
>
  Reserve
</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;