import React from "react";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getImages } from "../../service/imageCrud";
import { Navbar as BootstrapNavbar, Container, Offcanvas } from 'react-bootstrap';

export default function Navbar() {
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
   <div>
    <BootstrapNavbar className="navbar navbar-dark bg-primary" expand="lg">
      <Container>
        <NavLink to="/" className="link_menu">
          <img src="logo.png" alt="Logo" width="40" height="44" className="d-inline-block align-text-top" />
          Viajes Mar
        </NavLink>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <NavLink to="/" className="link_menu">Inicio</NavLink>
              </li>
              {images.map((image) => (
              <li className="nav-item">
                <NavLink to="/" className="link_menu">{image.fecha}</NavLink>
              </li>
              ))}
              <li className="nav-item">
                <NavLink to="/" className="link_menu">Legales</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="link_menu">Empresas Asociadas</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" className="link_menu">Contacto</NavLink>
              </li>
            </ul>
          </Offcanvas.Body>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
   </div>
 );
}
