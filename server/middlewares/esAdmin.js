import jwt from "jsonwebtoken";
import User from "../models/User.js";

const secret = process.env.SECRET_WORD || "secret";

export const esAdmin = async (req, res, next) => {
  try {
    const token = req.signedCookies.auth;
    const verifyToken = req.signedCookies.authConfirm;

    if (!verifyToken || token !== verifyToken) {
      return res.json({ message: "No valid user found", success: false });
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;

    const user = await User.findById(req.userId);
    if (user.username !== 'admin') {
      return res.json({ message: "Not authorized", success: false });
    }

    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Invalid token", success: false });
  }
};
