const express = require("express");
const { createBooking, getUserBookings, getAdminDashboardStats } = require("../controllers/booking.controllers");
const { requireSignIn } = require("../middleware/user.middleware");

const router = express.Router();

router.post("/", requireSignIn, createBooking);
router.get("/", requireSignIn, getUserBookings);
router.get("/admin/stats", requireSignIn, getAdminDashboardStats);

module.exports = router;
