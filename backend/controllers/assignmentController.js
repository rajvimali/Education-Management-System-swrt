const Assignment = require("../models/Assignment");

// Create assignment (Teacher only)
const createAssignment = async (req, res) => {
  const { title, description, dueDate, courseId } = req.body;

  try {
    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: courseId,
      teacher: req.user._id, // Assuming req.user contains the logged-in teacher's ID
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all assignments for a course
const getAssignments = async (req, res) => {
  const { courseId } = req.params;
  try {
    const assignments = await Assignment.find({ course: courseId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an assignment (Teacher only)
const deleteAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const assignment = await Assignment.findByIdAndDelete(assignmentId);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });
    res.status(200).json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAssignment, getAssignments, deleteAssignment };
