import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/sidebar.css'; // Estilos adicionales opcionales
import { Offcanvas, Button, Navbar } from 'react-bootstrap';

const Sidebar = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className='d-flex justify-content-start'>
        <Button
          variant="outline-primary"
          onClick={handleShow}
          className="m-3"
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '25px' }}>
            <span style={{ width: '30px', height: '3px', backgroundColor: 'black' }}></span>
            <span style={{ width: '30px', height: '3px', backgroundColor: 'black' }}></span>
            <span style={{ width: '30px', height: '3px', backgroundColor: 'black' }}></span>
          </div>
        </Button>
      </div>
      {/* Offcanvas de Bootstrap */}
      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <img src="/src/assets/img/Recurso 1.svg" alt="Ontoy" />
          </Offcanvas.Title>
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
    </div>
  );
};

export default Sidebar;
