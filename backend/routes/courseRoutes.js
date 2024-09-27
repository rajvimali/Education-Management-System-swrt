const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", protect, admin, createCourse);
router.get("/", protect, getCourses);

module.exports = router;
