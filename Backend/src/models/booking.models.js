const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    guests: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, default: "Confirmed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
