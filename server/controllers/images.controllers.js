import Image from "../models/Image.js";

import fs from "fs-extra";
import path from "path";
import { userImages } from "../helpers/userImages.js";
import { fileURLToPath } from 'url';

//--Get images
export const getImages = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 }).limit(20);
  return res.json(images);
};

//--Get single image
export const getSingleImage = async (req, res) => {
  const image = await Image.findById(req.params._id);
  if (!image)
    return res.json({ message: "The image does not exist", success: false });
  return res.json(image);
};

//--Create image
export const createNewImage = async (req, res) => {
  const { title, ascenso, costo, gasto, total, excursion, fecha, link, extra, alojamiento, userId} = req.body;

  if (!req.file) return res.json({ message: "No file found", success: false });

  const storage_name = req.file.filename;

  const newImage = new Image({
    title,
    ascenso,
    costo,
    gasto,
    total,
    excursion,
    fecha,
    link,
    extra, 
    alojamiento,
    userId,
    storage_name,
  });

  const savedImage = await newImage.save();

  const images = await userImages(userId);

  return res.json({
    message: "Image uploaded",
    success: true,
    images,
    newImageId: savedImage._id,
  });
};

//--Update image
export const updateImage = async (req, res) => {
  const image = await Image.findById(req.params.id);

  if (!image)
    return res.json({ message: "The image does not exist", success: false });

  if (image.userId !== req.userId)
    return res.json({ message: "Not authorized to update", success: false });

  await Image.findByIdAndUpdate(req.params.id, req.body);

  return res.json({
    message: "Image updated",
    success: true,
  });
};

//--Delete image
export const deleteImage = async (req, res) => {
  const image = await Image.findById(req.params._id);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  if (!image)
    return res.json({ message: "The image does not exist", success: false });

  const deletedImage = await Image.findByIdAndDelete(req.params._id);

  await fs.unlink(
    path.join(__dirname, `../public/uploads/${deletedImage.storage_name}`)
  );

  const images = await userImages(req.userId);

  return res.json({ message: "Image deleted", success: true, images });
};