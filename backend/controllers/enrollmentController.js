const Enrollment = require("../models/Enrollment");
const User = require("../models/User");
const Course = require("../models/Course");

// Enroll a student in a course (Admin only)
const enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;
  console.log("Received studentId:", studentId); // <-- Add this for debugging

  try {
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || student.role !== "student") {
      return res.status(404).json({ message: "Student not found" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments for a course
const getEnrollments = async (req, res) => {
  const { courseId } = req.params;
  try {
    const enrollments = await Enrollment.find({ course: courseId }).populate(
      "student",
      "name email"
    );
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an enrollment (Admin only)
const deleteEnrollment = async (req, res) => {
  const { enrollmentId } = req.params;
  try {
    const enrollment = await Enrollment.findByIdAndDelete(enrollmentId);
    if (!enrollment)
      return res.status(404).json({ message: "Enrollment not found" });
    res.status(200).json({ message: "Enrollment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { enrollStudent, getEnrollments, deleteEnrollment };
