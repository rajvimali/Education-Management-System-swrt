const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes with JWT authentication
const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Role-based access control
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as admin" });
  }
};

// Teacher role middleware
const teacher = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as teacher" });
  }
};

// Student role middleware
const student = (req, res, next) => {
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as student" });
  }
};

module.exports = { protect, admin, teacher, student };
