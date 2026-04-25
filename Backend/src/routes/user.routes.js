const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/user.controllers");
const { requireSignIn } = require("../middleware/user.middleware");

const router = express.Router();


router.post("/register",registerController)
router.post("/login",loginController)
router.post("/logout",requireSignIn,logoutController)

module.exports = router;