const Booking = require("../models/booking.models");

const createBooking = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests, totalPrice, name, phone } = req.body;

    if (!propertyId || !checkIn || !checkOut || !guests || !totalPrice || !name || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBooking = await Booking.create({
      property: propertyId,
      guest: req.user.id,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      name,
      phone,
    });

    res.status(201).json({ success: true, message: "Booking confirmed successfully!", booking: newBooking });
  } catch (error) {
    console.log("Error in createBooking:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ guest: req.user.id })
      .populate("property", "title location image price")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log("Error in getUserBookings:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAdminDashboardStats = async (req, res) => {
  try {
    const adminId = req.user.id;
    
    // 1. Find all properties owned by this admin
    const Property = require("../models/property.models");
    const properties = await Property.find({ host: adminId });
    const propertyIds = properties.map(p => p._id);
    
    // 2. Find all bookings for these properties
    const bookings = await Booking.find({ property: { $in: propertyIds } })
      .populate("property", "title location image price")
      .populate("guest", "name email phone")
      .sort({ createdAt: -1 });
      
    // 3. Calculate stats
    const totalProperties = properties.length;
    const totalBookings = bookings.length;
    
    let totalEarnings = 0;
    bookings.forEach(b => {
      totalEarnings += b.totalPrice;
    });
    
    res.status(200).json({
      success: true,
      stats: {
        totalProperties,
        totalBookings,
        totalEarnings,
      },
      recentBookings: bookings
    });
  } catch (error) {
    console.log("Error in getAdminDashboardStats:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createBooking, getUserBookings, getAdminDashboardStats };
