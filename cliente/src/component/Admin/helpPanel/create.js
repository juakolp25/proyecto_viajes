import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import Context from "../../../service/context.js";
import { createImage } from "../../../service/imageCrud.js";
import { showPreview } from "../../../service/showPrevies.js";

export default function Create(){
    const [title, setTitle] = useState("");
    const [ascenso, setAscenso] = useState("");
    const [image, setImage] = useState(null);
    const [costo, setCosto] = useState("");
    const [gasto, setGasto] = useState("");
    const [total, setTotal] = useState("");
    const [excursion, setExcursion] = useState("");
    const [fecha, setFecha] = useState("");
    const [link, setLink] = useState("");
    const [extra, setExtra] = useState("");
    const [alojamiento, setAlojamiento] = useState("");
    const [pathImage, setPathImage] = useState(null);
    const [invalidImage, setInvalidImage] = useState(null);
    
    const navigate = useNavigate();

    // Estots metodos actualizaran las propiedades del estado
    const showImagePreview = (e) => {
        if (e.target.files.length > 0) {
          const file = e.target.files[0];
          showPreview(file, setImage, setPathImage, setInvalidImage);
        }
    };

    
    const { isLogged } = useContext(Context);

    //Esta funcion manejara la presentacion del formulario y enviara una solicitud POST a la URL con los daros el formularios
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLogged) {
            window.alert('Debes iniciar sesión para subir una imagen.');
            navigate("/admin");
            return;
        }
    
        // Crear un objeto FormData para enviar la imagen
        createImage(title, ascenso, image, costo, gasto, total, excursion, fecha, link, extra, alojamiento)
        .then((res) => {
          if (res.data.success) {
            const user = JSON.parse(window.localStorage.getItem("user"));

            user.images = res.data.images;
            window.localStorage.setItem("user", JSON.stringify(user));

            
            navigate("/admin/panel");
          }
        })
        .catch((err) => console.log(err));

    }
    

    // La siguiente sección mostrará el formulario que toma la entrada del usuario.
    return(
        <div>
            <h3>Crear Nuevo Registro</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className= "form-control">
                    <label htmlFor= "title">Titulo: </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "ascenso">Ascenso: </label>
                    <textarea
                        className="form-control"
                        placeholder="Ascenso"
                        onChange={(e) => setAscenso(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-control">
                    <label htmlFor="image">Imagen: </label>
                    <input
                       type="file"
                       id="image"
                       name="image"
                       accept="image/**"
                       onChange={showImagePreview}
                       required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "costo">Costo: </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Costo"
                        onChange={(e) => setCosto(e.target.value)}
                        required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "gasto">Gastos Administrativo: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Gasto"
                      onChange={(e) => setGasto(e.target.value)}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "total">Total: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Total"
                      onChange={(e) => setTotal(e.target.value)}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "excursion">Excursiones(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Excursion"
                      onChange={(e) => setExcursion(e.target.value)}
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "fecha">Fecha: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Fecha"
                      onChange={(e) => setFecha(e.target.value)}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "link">Link: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Link"
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "extra">Extra(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Extra"
                      onChange={(e) => setExtra(e.target.value)}
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "alojamiento">Alojamiento(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Alojamiento"
                      onChange={(e) => setAlojamiento(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    {invalidImage ? (
                    <span className="text-danger d-block mb-2">{invalidImage}</span>
                    ) : null}
                    <button type="submit">Crear</button>
                    <button type="button" onClick={() => navigate("/admin/panel")}>Cancelar</button>
                </div>
                <img src={pathImage} alt="Preview" />
            </form>
        </div>
    );
}