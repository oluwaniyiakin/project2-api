const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// 🔹 Public routes (No authentication required)
router.post("/register", authController.registerUser);  // User registration
router.post("/login", authController.loginUser);        // User login

// 🔹 Protected route (requires authentication)
router.get("/profile", verifyToken, authController.getProfile); // Get user profile (secured)

// 🔹 Logout (Optional: can be protected or public)
router.post("/logout", authController.logoutUser);

module.exports = router;
