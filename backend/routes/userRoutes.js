const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
} = require("../controllers/userController");
const { protect, admin } = require("../middlewares/authMiddleware"); // Use protect and admin middleware if needed
const router = express.Router();

// User registration and login routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Get all users (only accessible by admin)
router.get("/", protect, admin, getUsers);

module.exports = router;
