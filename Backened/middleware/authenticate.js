import jwt from "jsonwebtoken";
import Admin from "../Schema/adminschema.js";
import User from "../Schema/userschema.js";

const verifyToken = (req) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("No token provided");
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const adminAuth = async (req, res, next) => {
  try {
    const decoded = verifyToken(req);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ message: "Unauthorized" });
    req.admin = admin;
    next();
  } catch (error) {
    const msg = error.name === "TokenExpiredError" ? "Token expired" : "Unauthorized";
    res.status(401).json({ message: msg });
  }
};

export const userAuth = async (req, res, next) => {
  try {
    const decoded = verifyToken(req);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    req.user = user;
    next();
  } catch (error) {
    const msg = error.name === "TokenExpiredError" ? "Token expired" : "Unauthorized";
    res.status(401).json({ message: msg });
  }
};
