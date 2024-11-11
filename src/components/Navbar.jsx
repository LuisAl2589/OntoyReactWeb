import React from 'react';
import './css/navbar.css';
import { isLoggedIn } from './AuthRoute';
import { Navbar, Nav, NavDropdown, Container, Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const AppNavbar = () => {
    return (
        <Navbar expand="xl" variant='dark' className='navbar'>
            <Container fluid>
                <Navbar.Brand href="#">
                    <img src="/src/assets/img/Logo.svg" alt="Ontoy" height="30" />
                    OnToy
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className='mx-auto flex-grow-0 w-50 justify-content-center'>
                        <Nav.Link href="#" className="active">
                            Inicio
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-3">
                            Sobre nosotros
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-3">
                            Servicios
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-3">
                            Mapa
                        </Nav.Link>
                        <Nav.Link href="#" className="mx-3">
                            Contacto
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#">
                            <button class="btn btn-primary">Iniciar Sesión</button>
                        </Nav.Link>
                        <Nav.Link href="#">
                            <button class="btn btn-outline-primary">Registrarse</button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;