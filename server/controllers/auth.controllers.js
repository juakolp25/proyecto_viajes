import User from "../models/User.js";
import { isAdmin } from "../helpers/isAdmin.js";
import jwt from "jsonwebtoken";
import { userImages } from "../helpers/userImages.js";

import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_WORD || "secret";

//--Iniciar
export const admin = async (req, res) => {
  console.log(req.data)
  const userFound = await User.findOne({ username: req.body.username });

  if (!userFound)
    return res.json({
      message: "This username is not registered",
      success: false,
    });

  const matchPassword = await User.comparePasswords(
    req.body.password,
    userFound.password
  );
  
  if (!matchPassword){
    return res.json({ message: "Invalid password", success: false });
  }

  const token = jwt.sign({ id: userFound._id }, secret, {
  expiresIn: 86400 // expires in 24 hours
  });

  //...Sending success response
  const cookieOptions = {
    signed: true,
    httpOnly: true,
    maxAge: 24 * 3600000,
  };

  const images = await userImages(userFound._id);
  const username = userFound.username;
  console.log("username: ", username)
  const admin = await isAdmin(username);
  console.log(admin);
  res.cookie("isAdmin", admin, cookieOptions);
  res.cookie("auth", token, cookieOptions);
  res.cookie("authConfirm", token, {
    signed: true,
    maxAge: 24 * 3600000,
  });

  res.json({
    username,
    userId: userFound._id,
    images,
    success: true,
  });

};


//--Cambiar contraseña
export const change = async (req, res) => {
    const userFound = await User.findOne({ username: req.body.username });
  
    if (!userFound)
      return res.json({
        message: "This username is not registered",
        success: false,
      });
  
    const { password } = req.body;
  
    userFound.password = await User.encryptPassword(password);
  
    await userFound.save();
  
    return res.json({ message: "Password changed", success: true });
  };