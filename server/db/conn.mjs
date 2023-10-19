import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.ATLAS_URI;

mongoose
  .connect(URI)
  .then(() => console.log("Database conected"))
  .catch((err) => console.log("Error conecting to database:", err));