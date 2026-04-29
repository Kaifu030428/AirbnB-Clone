const express = require("express");
const { registerController, loginController, logoutController, toggleWishlist, getWishlist } = require("../controllers/user.controllers");
const { requireSignIn } = require("../middleware/user.middleware");

const router = express.Router();


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",requireSignIn,logoutController)

// Wishlist routes
router.post('/wishlist/:propertyId', requireSignIn, toggleWishlist);
router.get('/wishlist', requireSignIn, getWishlist);

module.exports = router;