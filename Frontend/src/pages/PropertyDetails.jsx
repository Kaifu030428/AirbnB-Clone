import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { properties } from "../data/properties";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const propertyId = Number(id);
  const selectedProperty = properties.find((item) => item.id === propertyId);

  const pricePerNight = selectedProperty?.price ?? 10000;
  const maxGuests = 4;
  const extraGuestCharge = 2000;
  const serviceFee = 1000;

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
  const nightsCount = nights > 0 ? nights : 0;

  const extraGuestTotal =
    guests > 2 ? (guests - 2) * extraGuestCharge * nightsCount : 0;

  const totalPrice =
    nightsCount * pricePerNight + extraGuestTotal + serviceFee;

  if (!selectedProperty) {
    return (
      <div className="px-6 md:px-10 py-10">
        <Card className="max-w-xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-900">Property not found</h1>
          <p className="mt-2 text-gray-600">
            This listing may have been removed or the URL is incorrect.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-airbnb text-white px-4 py-2.5 hover:bg-airbnb-dark transition"
            >
              Back to home
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 text-gray-800 px-4 py-2.5 hover:bg-gray-50 transition"
            >
              Explore services
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert("Please select dates");
      return;
    }

    if (nights <= 0) {
      alert("Checkout date must be after checkin date");
      return;
    }

    if (guests > maxGuests) {
      alert(`Only ${maxGuests} guests allowed`);
      return;
    }

    navigate(`/booking/${id}`, {
      state: {
        checkIn,
        checkOut,
        guests,
        totalPrice,
        propertyName: selectedProperty?.title,
        propertyLocation: selectedProperty?.location,
      },
    });
  };

  return (
    <div className="px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 mb-2">
        {selectedProperty?.title ?? "Property details"}
      </h1>
      <p className="text-gray-500 mb-6">
        ⭐ {selectedProperty?.rating ?? 4.8} · {selectedProperty?.location ?? "Goa, India"} · Hosted by ArBn
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <section className="lg:col-span-2 space-y-6">
          <img
            src={selectedProperty?.image ?? "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
            alt={selectedProperty?.title ?? "Property image"}
            className="rounded-3xl w-full h-[260px] md:h-[420px] object-cover"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card as="article" className="rounded-2xl p-4">
              <p className="text-sm text-gray-500">Entire home</p>
              <p className="font-semibold text-gray-900 mt-1">4 guests · 2 bedrooms</p>
            </Card>
            <Card as="article" className="rounded-2xl p-4">
              <p className="text-sm text-gray-500">Highlights</p>
              <p className="font-semibold text-gray-900 mt-1">{selectedProperty?.description ?? "Top-rated with great reviews"}</p>
            </Card>
            <Card as="article" className="rounded-2xl p-4">
              <p className="text-sm text-gray-500">Free cancellation</p>
              <p className="font-semibold text-gray-900 mt-1">Until 48 hours before check-in</p>
            </Card>
          </div>
        </section>

        <Card as="aside" className="p-5 md:p-6 shadow-sm h-fit lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold mb-1 text-gray-900">
            ₹{pricePerNight} / night
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Maximum {maxGuests} guests allowed
          </p>

          <div className="border border-gray-300 rounded-2xl overflow-hidden mb-4">
            <div className="flex">
              <input
                type="date"
                aria-label="Check-in date"
                className="w-1/2 px-3 py-3 outline-none border-r border-gray-300 focus:bg-rose-50/40"
                onChange={(e) => setCheckIn(e.target.value)}
              />
              <input
                type="date"
                aria-label="Check-out date"
                className="w-1/2 px-3 py-3 outline-none focus:bg-rose-50/40"
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <div className="border-t border-gray-300">
              <input
                type="number"
                min="1"
                max={maxGuests}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                aria-label="Number of guests"
                className="w-full px-3 py-3 outline-none focus:bg-rose-50/40"
              />
            </div>
          </div>

          <div className="mb-5 text-sm text-gray-700 space-y-2">
            <p>₹{pricePerNight.toLocaleString("en-IN")} × {nightsCount} nights = ₹{(pricePerNight * nightsCount).toLocaleString("en-IN")}</p>

            {extraGuestTotal > 0 && (
              <p>Extra guest fee = ₹{extraGuestTotal.toLocaleString("en-IN")}</p>
            )}

            <p>Service fee = ₹{serviceFee.toLocaleString("en-IN")}</p>

            <hr className="my-3 border-gray-200" />

            <p className="font-semibold text-gray-900 text-base">
              Total: ₹{totalPrice.toLocaleString("en-IN")}
            </p>
          </div>

          <Button
            onClick={handleReserve}
            className="w-full"
          >
            Reserve
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PropertyDetails;