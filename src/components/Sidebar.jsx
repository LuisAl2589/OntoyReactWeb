import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/sidebar.css'; // Estilos adicionales opcionales
import { Offcanvas, Button } from 'react-bootstrap';

const Sidebar = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Botón para abrir el menú */}
      <Button variant="primary" onClick={handleShow} className="m-3">
        Abrir Menú
      </Button>

      {/* Offcanvas de Bootstrap */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <li className="mb-2">
              <a href="/" className="text-decoration-none">Inicio</a>
            </li>
            <li className="mb-2">
              <a href="/mapa" className="text-decoration-none">Mapa</a>
            </li>
            <li className="mb-2">
              <a href="#services" className="text-decoration-none">Servicios</a>
            </li>
            <li className="mb-2">
              <a href="#about" className="text-decoration-none">Sobre Nosotros</a>
            </li>
            <li className="mb-2">
              <a href="#contact" className="text-decoration-none">Contacto</a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
