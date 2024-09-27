const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const gradeRoutes = require("./routes/gradeRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Define routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
// Use the enrollment routes
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/grades", gradeRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
