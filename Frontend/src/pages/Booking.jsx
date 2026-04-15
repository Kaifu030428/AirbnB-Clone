import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { properties } from "../data/properties";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const propertyId = Number(id);
  const selectedProperty = properties.find((item) => item.id === propertyId);

  const { checkIn, checkOut, guests, totalPrice, propertyName, propertyLocation } = location.state || {};
  const validBookingData = checkIn && checkOut && guests && totalPrice;

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
    <div className="px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-2">Confirm Booking</h1>
      <p className="text-gray-600 mb-8">Review your details and complete your reservation.</p>

      {!selectedProperty ? (
        <Card className="max-w-xl border-amber-200 bg-amber-50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-amber-900">Property not found</h2>
          <p className="text-amber-800 mt-2">
            We could not find this listing. Please choose another property from the home page.
          </p>
          <Link
            to="/"
            className="inline-flex mt-4 bg-airbnb text-white px-4 py-2 rounded-xl hover:bg-airbnb-dark transition"
          >
            Go to home
          </Link>
        </Card>
      ) : !validBookingData ? (
        <Card className="max-w-xl border-amber-200 bg-amber-50 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-amber-900">Missing booking details</h2>
          <p className="text-amber-800 mt-2">
            Please select your dates and guests from the property page before confirming your booking.
          </p>
          <Link
            to={`/property/${id}`}
            className="inline-flex mt-4 bg-airbnb text-white px-4 py-2 rounded-xl hover:bg-airbnb-dark transition"
          >
            Return to property
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <Card as="section" className="p-6 h-fit">
            <h2 className="text-xl font-semibold mb-5 text-gray-900">Your Trip</h2>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-medium text-gray-900">Property:</span> {propertyName ?? selectedProperty?.title ?? `Property #${id}`}</p>
              <p><span className="font-medium text-gray-900">Location:</span> {propertyLocation ?? selectedProperty?.location ?? "N/A"}</p>
              <p><span className="font-medium text-gray-900">Check-in:</span> {checkIn}</p>
              <p><span className="font-medium text-gray-900">Check-out:</span> {checkOut}</p>
              <p><span className="font-medium text-gray-900">Guests:</span> {guests}</p>
            </div>
            <hr className="my-5 border-gray-200" />
            <p className="font-semibold text-lg text-gray-900">
              Total Price: ₹{Number(totalPrice).toLocaleString("en-IN")}
            </p>
          </Card>

          <Card as="section" className="p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Enter Your Details</h2>

            <label className="text-sm font-medium text-gray-700" htmlFor="full-name">
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              placeholder="Enter your name"
              className="border border-gray-300 px-4 py-3 rounded-xl w-full mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-airbnb"
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-sm font-medium text-gray-700" htmlFor="phone-number">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="text"
              placeholder="Enter phone number"
              className="border border-gray-300 px-4 py-3 rounded-xl w-full mt-1 mb-5 focus:outline-none focus:ring-2 focus:ring-airbnb"
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              onClick={handleBooking}
              className="w-full"
            >
              Confirm Booking
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Booking;