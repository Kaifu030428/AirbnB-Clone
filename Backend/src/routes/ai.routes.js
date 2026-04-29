const express = require("express");
const { generateTripPlan, generatePropertyDescription, suggestPrice, chatWithConcierge, processVoiceSearch } = require("../controllers/ai.controllers");
const { requireSignIn } = require("../middleware/user.middleware");

const router = express.Router();

// Allow without login for testing, but ideally should be requireSignIn
router.post("/plan-trip", generateTripPlan);
router.post("/magic-write", requireSignIn, generatePropertyDescription);
router.post("/suggest-price", requireSignIn, suggestPrice);
router.post("/chat", chatWithConcierge);
router.post("/voice-search", processVoiceSearch);

module.exports = router;
