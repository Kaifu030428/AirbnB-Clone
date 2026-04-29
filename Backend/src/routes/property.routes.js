const express = require("express");
const { getAllProperties, createProperty, getPropertyById, getUserProperties, deleteProperty } = require("../controllers/property.controllers");
const { requireSignIn } = require("../middleware/user.middleware");

const router = express.Router();

router.get("/", getAllProperties);
router.get("/user-properties", requireSignIn, getUserProperties); // This MUST be before /:id
router.get("/:id", getPropertyById);
router.post("/", requireSignIn, createProperty);
router.delete("/:id", requireSignIn, deleteProperty);

module.exports = router;
