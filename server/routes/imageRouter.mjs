import { Router } from "express";
import { uploader } from "../db/multter.mjs";
import multer from "multer";
import {
  createNewImage,
  getImages,
  getSingleImage,
  updateImage,
  deleteImage,
} from "../controllers/images.controllers.js";

const recordAdmin = Router();

// Middleware para manejar los errores de Multer
const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Un error ocurrió mientras Multer procesaba la solicitud
    console.error(err);
    res.status(500).json({ error: err.message });
  } else if (err) {
    // Un error desconocido ocurrió
    console.error(err);
    res.status(500).json({ error: 'Un error desconocido ocurrió al subir el archivo' });
  }

  // Si todo salió bien, pasa al siguiente middleware
  next();
};

recordAdmin
  .route("/imagenAdmin")
  .get(getImages)
  .post(uploader.single("image"), multerErrorHandler, createNewImage);

recordAdmin
  .route("/imagenAdmin/:_id")
  .get(getSingleImage)
  .put(updateImage)
  .delete(deleteImage);

export default recordAdmin;
