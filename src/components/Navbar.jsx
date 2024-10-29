import React from 'react';
import './css/navbar.css';

const user = JSON.parse(localStorage.getItem('user'));

const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    window.location.href = '/';
}

const Nav = () => {
    return (
        <header className='header'>
            
            <div className='logo'>
            <img src="/src/assets/img/ontoyLogo.jpeg" alt="Ontoy" />
            <a href="">OnToy</a>
            </div>
            <nav className='navbar'>
                <input type="checkbox" id='check' />
                <label htmlFor='check' className='checkbtn'>
                    <i className="check fa-solid fa-bars"></i>
                </label>
                <ul>
                    <li><a href="#sobre-mi">Sobre nosotros</a></li>
                    <li><a href="#tecnologias">Servicios</a></li>
                    <li><a href="#proyectos">Mapa</a></li>
                    <li><a href="#formacion">Contacto</a></li>
                    {user!=null && 
                        <form onSubmit={handleSubmit}>
                            <li><button className='button-primary' type='submit'>Cerrar Sesión</button></li>
                        </form>
                    }
                    {user==null && <li><a href="/login">Iniciar Sesión</a></li>}
                </ul>
                
            </nav>
        </header>
    );
}

export default Nav;