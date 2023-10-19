//--Imports
import { useState, useEffect } from "react";
import { getImages } from "../../service/imageCrud";
import { Link } from "react-router-dom";

const MainImage = () => {
  //..States
  const [images, setImages] = useState([]);

  //...Getting images
  useEffect(() => {
    const abortController = new AbortController();

    getImages()
      .then((res) => setImages(res.data))
      .catch((err) => console.log(err));

    return () => abortController.abort();
  }, []);

  return (
    <div className="section_pack">
        <h3><span className="name_logo">Venta de paquetes de turismo</span></h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {images.map((image) => (
            <div className="col" key={image._id}>
              <div className="card">
                <img src={`http://localhost:5050/${image.storage_name}`} className="card-img-top" alt={image.title} />
                <div className="card-body">
                  <Link to={`/image/${image._id}`} className="btn btn-primary">Mas Información</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default MainImage;