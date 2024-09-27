const Grade = require("../models/Grade");

// Assign grade (Teacher only)
const assignGrade = async (req, res) => {
  const { studentId, courseId, assignmentId, grade, feedback } = req.body;
  try {
    const newGrade = await Grade.create({
      student: studentId,
      course: courseId,
      assignment: assignmentId,
      grade,
      feedback,
    });
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all grades for a student in a course
const getStudentGrades = async (req, res) => {
  const { studentId, courseId } = req.params;
  try {
    const grades = await Grade.find({
      student: studentId,
      course: courseId,
    }).populate("assignment", "title");
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assignGrade, getStudentGrades };
