import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar className="navbar-dark bg-primary">
      <Container>
        <Link className="navbar-link link_menu" to={'/'}>
          <img src="logo.png" alt="Logo" width="40" height="34" className="d-inline-block align-text-top" />
        </Link>
        <Nav>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>Legales</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>Empresas Asociadas</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>© | <i>Juaquin</i> </Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>011 59073405</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>viajesmar@gmail.com</Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="navbar-link link_menu" to={'/'}>Manuel Sarratea 588, Claypole</Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
