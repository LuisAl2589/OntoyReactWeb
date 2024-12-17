import React from 'react';
import './css/navbar.css';
import { useState } from 'react'
import { logoutUser } from '../api/auth';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        setIsLoggedIn(false);
    };

    return (
    <Navbar expand="xl" variant="dark" className="navbar w-100">
      <Container fluid>
        <Navbar.Brand href="#">
          <img src="/src/assets/img/Logo.svg" alt="Ontoy" height="30" />
          OnToy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="mx-auto flex-grow-0 w-50 justify-content-center">
            <Nav.Link href="#" className="active">
              Inicio
            </Nav.Link>
            <Nav.Link href="/sobre" className="mx-3">
              Sobre nosotros
            </Nav.Link>
            <Nav.Link href="/mapa" className="mx-3">
              Mapa
            </Nav.Link>
            <Nav.Link href="/contactos" className="mx-3">
              Contacto
            </Nav.Link>
            <Nav.Link href="/admin" className="mx-3">
              Admin
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">
                  <button className="btn btn-primary">Iniciar Sesión</button>
                </Nav.Link>
                <Nav.Link href="/Register">
                  <button className="btn btn-outline-primary">Registrarse</button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;