const express = require("express");
const { registerUser, verifyEmail, loginUser,logoutUser } = require("../controllers/authController");

const router = express.Router();

// User Registration Route
router.post("/register", registerUser);

// Email Verification Route
router.get("/verify/:token", verifyEmail);

// User Login Route
router.post("/login", loginUser);
// User Logout Route
router.post("/logout", logoutUser);

module.exports = router;
