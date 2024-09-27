const express = require("express");
const {
  createAssignment,
  getAssignments,
  deleteAssignment,
} = require("../controllers/assignmentController");
const { protect, teacher } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, teacher, createAssignment); // Teacher creates assignment
router.get("/:courseId", protect, getAssignments); // Teacher/Students view assignments
router.delete("/:assignmentId", protect, teacher, deleteAssignment); // Teacher deletes assignment

module.exports = router;
