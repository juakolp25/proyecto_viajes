import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { updateImage } from "../../../service/imageCrud.js";
 
export default function Edit() {
 const [form, setForm] = useState({
    title: "",
    ascenso: "",
    image: "",
    costo: "",
    gasto: "",
    total: "",
    excursion: "",
    fecha: "",
    link: "",
    extra: "",
    alojamiento: "",
    records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params._id.toString();
     const response = await fetch(`http://localhost:5050/api/admin/record/imagenAdmin/${params._id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/admin/panel");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params._id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }


 async function onSubmit(e) {
   e.preventDefault();
   const editPubl = {
     title: form.title,
     ascenso: form.ascenso,
     costo: form.costo,
     gasto: form.gasto,
     total: form.total,
     excursion: form.excursion,
     fecha: form.fecha,
     link: form.link,
     extra: form.extra,
     alojamiento: form.alojamiento,
   };
 
   // This will send a post request to update the data in the database.
   await updateImage(editPubl.title, editPubl.ascenso, editPubl.costo, editPubl.gasto, editPubl.total, editPubl.excursion, editPubl.fecha, editPubl.link, editPubl.extra, editPubl.alojamiento, params._id);
 
   navigate("/admin/panel");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
     <div className= "form-control">
                    <label htmlFor= "title">Titulo: </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Title"
                        onChange={(e) => updateForm({title: e.target.value})}
                        required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "ascenso">Ascenso: </label>
                    <textarea
                        className="form-control"
                        placeholder="Ascenso"
                        onChange={(e) => updateForm({ascenso: e.target.value})}
                        required
                    ></textarea>
                </div>
                <div className= "form-control">
                    <label htmlFor= "costo">Costo: </label>
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Costo"
                        onChange={(e) => updateForm({costo: e.target.value})}
                        required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "gasto">Gastos Administrativo: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Gasto"
                      onChange={(e) => updateForm({gasto: e.target.value})}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "total">Total: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Total"
                      onChange={(e) => updateForm({total: e.target.value})}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "excursion">Excursiones(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Excursion"
                      onChange={(e) => updateForm({excursion: e.target.value})}
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "fecha">Fecha: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Fecha"
                      onChange={(e) => updateForm({fecha: e.target.value})}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "link">Link: </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Link"
                      onChange={(e) => updateForm({link: e.target.value})}
                      required
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "extra">Extra(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Extra"
                      onChange={(e) => updateForm({extra: e.target.value})}
                    />
                </div>
                <div className= "form-control">
                    <label htmlFor= "alojamiento">Alojamiento(Opcional): </label>
                    <input
                      type= "text"
                      className= "formControl"
                      placeholder="Alojamiento"
                      onChange={(e) => updateForm({alojamiento: e.target.value})}
                    />
                </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}