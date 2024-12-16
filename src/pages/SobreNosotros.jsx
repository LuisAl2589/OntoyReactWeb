// AboutUsPage.jsx
import React from 'react';
import './css/sobre.css';
import AppNavbar from '../components/Navbar';

const AboutUsPage = () => {
  return (
    <div className="w-100">
      <AppNavbar />
      <header className="hero">
        <div className="chart">
          <h1>Sobre Nosotros</h1>
          <p>Conoce más sobre ONToy</p>
          <section>
            <h2>¿Quiénes somos?</h2>
            <p>
              ONToy es una empresa innovadora dedicada a la creación de herramientas tecnológicas que
              hacen la vida más sencilla y accesible. Nos especializamos en desarrollar aplicaciones
              interactivas, como nuestro proyecto actual, un croquis digital de la Escuela Superior
              de Cómputo (ESCOM), que facilita la navegación y el acceso a información clave del campus.
            </p>
          </section>
          <section className="mission-vision">
            <div className="mission">
              <h3>Misión</h3>
              <p>
                Nuestra misión es proporcionar soluciones tecnológicas innovadoras que mejoren la
                experiencia de los usuarios al interactuar con su entorno, promoviendo accesibilidad
                y eficiencia en la gestión de espacios educativos y empresariales.
              </p>
            </div>
            <div className="vision">
              <h3>Visión</h3>
              <p>
                Ser líderes en el desarrollo de aplicaciones interactivas que transformen la manera
                en que las personas se relacionan con su entorno, contribuyendo al avance tecnológico
                en instituciones educativas y más allá.
              </p>
            </div>
          </section>
        </div>
      </header>
    </div>
  );
};

export default AboutUsPage;
