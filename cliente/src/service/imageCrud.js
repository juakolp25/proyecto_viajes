import axios from "axios";

const url = "http://localhost:5050/api/admin/record/imagenAdmin";

//--Get images
export const getImages = () => {
  return axios({
    url,
  });
};

//--Create new image
export const createImage = (title, ascenso, image, costo, gasto, total, excursion, fecha, link, extra, alojamiento) => {
  // Cuando envías el formulario

  const form = new FormData();
  form.append("title", title);
  form.append("ascenso", ascenso);
  form.append("image", image);
  form.append("costo", costo);
  form.append("gasto", gasto);
  form.append("total", total);
  form.append("excursion", excursion);
  form.append("fecha", fecha);
  form.append("link", link);
  form.append("extra", extra);
  form.append("alojamiento", alojamiento);

  const user = JSON.parse(window.localStorage.getItem("user"));
  const userId = user.userId;

  // Agrega el userId al objeto FormData
  form.append("userId", userId);

  return axios({
    url,
    method: "POST",
    data: form,
    withCredentials: true,
  });
};

export const getSingleImage = (id) => {
  return axios({
    url: `${url}/${id}`,
  });
};

//--Update Image
export const updateImage = (title, ascenso, costo, gasto, total, excursion, fecha, link, extra, alojamiento, id) => {
  return axios({
    url: `${url}/${id}`,
    method: "PUT",
    data: { title, ascenso, costo, gasto, total, excursion, fecha, link, extra, alojamiento },
    withCredentials: true,
  });
};

//--Delete image
export const deleteImage = (id) => {
  return axios({
    url: `${url}/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};
