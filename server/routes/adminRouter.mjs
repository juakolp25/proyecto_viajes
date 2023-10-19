import { Router } from "express";
import { admin, change } from "../controllers/auth.controllers.js";
import { isAuth } from "../middlewares/authentication.js";
import recordAdmin from "./imageRouter.mjs";
import User from "../models/User.js";

import getUserPassword from "../helpers/getUserPassword.js";

const router = Router();

router.post("/admin", admin);
router.post("/password", isAuth, change);
router.use("/admin/record", recordAdmin);

router.post('/admin/verifyPassword', async (req, res) => {
    const { password } = req.body;
  
    // Aquí debes obtener la contraseña del usuario desde tu base de datos
    const userPassword = await getUserPassword("admin");
    
    const matchPassword = await User.comparePasswords(
      password,
      userPassword
    );
  
    if (matchPassword) {
      res.json({ isPasswordCorrect: true });
    } else {
      res.json({ isPasswordCorrect: false });
    }
  });

export default router;