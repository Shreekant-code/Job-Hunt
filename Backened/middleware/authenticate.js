import jwt from "jsonwebtoken";
import userschema from "../Schema/userschema.js";
import adminschema from "../Schema/adminschema.js";

// Middleware: Authenticate user or admin
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check in users collection first
    let user = await userschema.findById(decoded.id).select("-password");

    // If not found in users, check in admin collection
    if (!user) {
      user = await adminschema.findById(decoded.id).select("-password");
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User/Admin not found" });
    }

    // Attach user/admin and role to request
    req.user = user;
    req.role = decoded.role; // Make sure role is included in JWT payload
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};


export const authorize = (roles = []) => (req, res, next) => {
  if (!roles.includes(req.role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
