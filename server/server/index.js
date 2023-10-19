import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import Subscriber from "../models/Subscriber.js";

import adminRouter from "../routes/adminRouter.mjs";


//inicialización

dotenv.config();
const app = express();

//mildware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET || "secret"));


//---estaticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../public/uploads")));

//--Rutas

app.use("/api", adminRouter);

app.post('/api/suscribirme', async (req, res) => {
  const email = req.body.email;

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.send('¡Gracias por suscribirte!');
  } catch (error) {
    res.status(500).send('Hubo un error al guardar tu suscripción. Por favor, inténtalo de nuevo más tarde.');
  } 
});

app.get('/api/suscribirme', async (req, res) => {
  try {
    const subscriptions = await Subscriber.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send('Hubo un error al obtener las suscripciones. Por favor, inténtalo de nuevo más tarde.');
  }
});

app.delete('/api/suscribirme/:id', async (req, res) => {
  try {
    const result = await Subscriber.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).send({ message: 'No se encontró la suscripción con el id dado' });
    } else {
      res.send({ message: 'Suscripción eliminada con éxito' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Hubo un error al eliminar la suscripción' });
  }
});

//exportamos la app
export default app;
