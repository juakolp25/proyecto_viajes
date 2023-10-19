import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getImages, deleteImage } from "../../../service/imageCrud.js";


const Record = (props) => (
 <tr>
   <td>{props.record.title}</td>
   <td>{props.record.ascenso}</td>
   <td>{props.record.storage_name}</td>
   <td>{props.record.costo}</td>
   <td>{props.record.gasto}</td>
   <td>{props.record.total}</td>
   <td>{props.record.excursion}</td>
   <td>{props.record.fecha}</td>
   <td>{props.record.link}</td>
   <td>{props.record.extra}</td>
   <td>{props.record.alojamiento}</td>
   <td>
     <Link className="btn btn-link" to={`/admin/panel/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteImage(props.record._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const [deletedImage, setDeletedImage] = useState(null);


 //...Getting images
 useEffect(() => {
  const abortController = new AbortController();

  getImages()
    .then((res) => {
      console.log(res.data); // Imprime los datos aquí
      setRecords(res.data);
    })
    .catch((err) => console.log(err));

  return () => abortController.abort();
}, [deletedImage]);

function handleDelete(id) {
  deleteImage(id)
    .then(() => setDeletedImage(id))
    .catch((err) => console.log(err));
}


 // This method will map out the records on the table
 function recordList() {
  if(records.length > 0){
    return records.map((record) => {
      return (
         <Record
           record={record}
           deleteImage={() => handleDelete(record._id)}
           key={record._id}
         />
       );
     });
  } 
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
      <div>
        <NavLink className="nav-link" to="/admin/panel/create">
          Create Record
        </NavLink>
      </div>
     <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
          <th>title</th>
          <th>ascenso</th>
          <th>storage_name</th>
          <th>costo</th>
          <th>gasto</th>
          <th>total</th>
          <th>excursion</th>
          <th>fecha</th>
          <th>link</th>
          <th>extra</th>
          <th>alojamiento</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}