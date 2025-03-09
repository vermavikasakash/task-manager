const JWT = require("jsonwebtoken");
const { User } = require("../models/userModel");

//! protected routes 1st token base for login
const requireSignIn = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access. No token provided." });
    }

    const token = authHeader.split(" ")[1]; 
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// !  protected middleware for admin login
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 1) {
      return res
        .status(403)
        .send({ success: false, message: "Unauthorized Admin Access" });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(403)
      .send({ success: false, message: "Error in Admin Middleware", error });
  }
};

module.exports = { requireSignIn, isAdmin };
