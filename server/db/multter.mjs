import multer from "multer";
import path from "path";
import { randomName } from "../helpers/randomName.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },

  filename: (req, file, cb) => {
    const imgName = randomName();

    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, `${imgName}-${Date.now()}${ext}`);
  },
});

export const uploader = multer({ storage });