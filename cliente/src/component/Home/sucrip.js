import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const Sucrip = () => {
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5050/api/suscribirme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Error al suscribirse');
      }

      handleShow();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="suc">
      <div className="container_form">
        <div className="title">
          <h5>No te pierdas ninguna promoción</h5>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            aria-label="Text input with segmented dropdown button"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" className="btn btn-outline-secondary" onClick={handleSubmit}>
            Suscribirme
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>¡Gracias por suscribirte!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¡Estás suscrito!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-secondary" onClick={handleClose}>
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sucrip;
