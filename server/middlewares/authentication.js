import jwt from "jsonwebtoken";

const secret = process.env.SECRET_WORD || "secret";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.signedCookies.auth;
    const verifyToken = req.signedCookies.authConfirm;

    if (!verifyToken || token !== verifyToken) {
      return res.json({ message: "No valid user found", success: false });
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ message: "Invalid token", success: false });
  }
};
