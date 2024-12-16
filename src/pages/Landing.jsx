import React from 'react';
import './css/landing.css'; // Make sure to create a corresponding CSS file for styling
import AppNavbar from '../components/Navbar';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';

const Landing = () => {
    return (
        <div className="w-100">
            <AppNavbar />
            <header className='hero-section'>
                <div className='chart-hero'>
                    <h1>¡Bienvenido a OnToy!</h1>
                    <p>Plataforma para ubicarte en la ESCOM</p>
                    
                </div>
            </header>
            <Footer />
        </div>
    );
};

export default Landing;