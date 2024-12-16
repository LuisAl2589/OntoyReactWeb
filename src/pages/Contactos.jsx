// ContactPage.jsx
import React from 'react';
import './css/contactos.css';
import AppNavbar from '../components/Navbar';
import Footer from '../components/Footer';


const contacts = [
  {
    name: 'Romero Uriel',
    role: 'Desarrollador Frontend',
    email: 'uriel.romero@ontoy.com',
    phone: '+52 55 1234 5678',
  },
  {
    name: 'Alarcón Joshua',
    role: 'Diseñador UX/UI',
    email: 'joshua.alarcon@ontoy.com',
    phone: '+52 55 2345 6789',
  },
  {
    name: 'Nájera Josué',
    role: 'Desarrollador Backend',
    email: 'josue.najera@ontoy.com',
    phone: '+52 55 3456 7890',
  },
  {
    name: 'Acevedo Armando',
    role: 'Desarrollador Backend',
    email: 'armando.acevedo@ontoy.com',
    phone: '+52 55 1351 7259',
  },
  {
    name: 'Castañeda Luis',
    role: 'Gerente de Proyecto',
    email: 'luis.castaneda@ontoy.com',
    phone: '+52 55 4567 8901',
  },
];

const ContactPage = () => {
  return (
    <div className="w-100">
      <AppNavbar />
      <header className="hero-2">
        <div className="chart-2">
          <div className="contact-page-container">
            <div className="contact-header">
              <h1>Contactos</h1>
              <p>Ponte en contacto con nuestro equipo</p>
            </div>
            <section className="contact-list">
              {contacts.map((contact, index) => (
                <div key={index} className="contact-card">
                  <h2>{contact.name}</h2>
                  <p><strong>Rol:</strong> {contact.role}</p>
                  <p><strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
                  <p><strong>Teléfono:</strong> {contact.phone}</p>
                </div>
              ))}
            </section>
          </div>  
        </div>
      </header>
      <Footer />
    </div>
  );
};

export default ContactPage;
