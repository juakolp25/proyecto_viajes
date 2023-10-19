import { Schema, model } from "mongoose";

const ImageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ascenso: {
      type: String,
      required: true,
    },
    costo: {
      type: String,
      required: true,
    },
    gasto: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    excursion: {
      type: String,
    },
    fecha: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    extra: {
      type: String,
    },
    alojamiento: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    storage_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model("Image", ImageSchema);