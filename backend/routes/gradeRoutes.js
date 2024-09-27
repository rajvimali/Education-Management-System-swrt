const express = require("express");
const {
  assignGrade,
  getStudentGrades,
} = require("../controllers/gradeController");
const { protect, teacher } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/assign", protect, teacher, assignGrade); // Teacher assigns grade
router.get("/:studentId/:courseId", protect, getStudentGrades); // Teacher/Student view grades

module.exports = router;
