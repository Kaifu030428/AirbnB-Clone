const Property = require("../models/property.models");

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("host", "name email");
    res.status(200).json({ success: true, properties });
  } catch (error) {
    console.log("Error in getAllProperties:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create a new property
const createProperty = async (req, res) => {
  try {
    const { title, location, description, price, image } = req.body;

    if (!title || !location || !description || !price || !image) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // req.user will come from requireSignIn middleware
    const newProperty = await Property.create({
      title,
      location,
      description,
      price,
      image,
      host: req.user.id, // Fixed: jwt payload contains id, not _id
    });

    res.status(201).json({ success: true, message: "Property created successfully", property: newProperty });
  } catch (error) {
    console.log("Error in createProperty:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate("host", "name email");
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }
    res.status(200).json({ success: true, property });
  } catch (error) {
    console.log("Error in getPropertyById:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get properties by user (Host view)
const getUserProperties = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.user.id });
    res.status(200).json({ success: true, properties });
  } catch (error) {
    console.log("Error in getUserProperties:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: "Property not found" });
    }

    // Check if the current user is the host
    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized to delete this property" });
    }

    await Property.findByIdAndDelete(req.params.id);
    
    res.status(200).json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.log("Error in deleteProperty:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { getAllProperties, createProperty, getPropertyById, getUserProperties, deleteProperty };
