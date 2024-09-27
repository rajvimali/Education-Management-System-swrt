const express = require("express");
const {
  enrollStudent,
  getEnrollments,
  deleteEnrollment,
} = require("../controllers/enrollmentController");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes protected with 'protect' for authentication and 'admin' for role authorization
router.post("/enroll", protect, admin, enrollStudent); // Admin enrolls a student
router.get("/:courseId", protect, admin, getEnrollments); // Admin views course enrollments
router.delete("/:enrollmentId", protect, admin, deleteEnrollment); // Admin deletes an enrollment

module.exports = router;
