import Image from "../models/Image.js";

export const userImages = async (id) => {
  const imagesFound = await Image.find({ userId: id }, { _id: 1 });
  const imagesIds = imagesFound.map((el) => el._id);
  return imagesIds;
};