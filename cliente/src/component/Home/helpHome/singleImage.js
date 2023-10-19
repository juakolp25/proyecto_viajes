import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleImage } from "../../../service/imageCrud.js";

const SingleImage = () => {
  //...States
  const [image, setImage] = useState([]);
  const { _id } = useParams();

  console.log(_id);
  

  //...Get image
  useEffect(() => {
    const abortController = new AbortController();

    getSingleImage(_id)
      .then((res) => {
        console.log(res.data); // Imprime los datos aquí
        setImage(res.data);
      })
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, [_id]);

  //...Render
  return (
    <div id="single-image" className="card">
      {Object.keys(image).length > 0 && (
        <>
          <div className="card-header bg-dark">
            <h3 className="text-white">{image.title}</h3>
          </div>
          <div className="card-body">
              <img
                src={`http://localhost:5050/${image.storage_name}`}
                alt={image.title}
              />
          </div>
          <div>
            <h5>{image.fecha}</h5>
            <p>{image.description}</p>
          </div>
        </>
      )}
    </div>
  );
  
};

//--Export
export default SingleImage;