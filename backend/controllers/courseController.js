const Course = require("../models/Course");

// Create a course
exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, teacher } = req.body;
  try {
    const course = await Course.create({
      title,
      description,
      startDate,
      endDate,
      teacher,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
