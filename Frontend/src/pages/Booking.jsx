import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();

  const { checkIn, checkOut, guests, totalPrice } = location.state || {};

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleBooking = () => {
    if (!name || !phone) {
      alert("Please fill all details");
      return;
    }

    alert("Booking Confirmed!");
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-3xl font-bold mb-6">Confirm Booking</h1>

      <div className="grid grid-cols-2 gap-10">
        
        {/* LEFT - Booking Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Trip</h2>
          <p><strong>Property ID:</strong> {id}</p>
          <p><strong>Check-in:</strong> {checkIn}</p>
          <p><strong>Check-out:</strong> {checkOut}</p>
          <p><strong>Guests:</strong> {guests}</p>
          <p className="font-semibold mt-2">Total Price: ₹{totalPrice}</p>
        </div>

        {/* RIGHT - Form */}
        <div className="border p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded-lg w-full mb-3"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 rounded-lg w-full mb-3"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            onClick={handleBooking}
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;