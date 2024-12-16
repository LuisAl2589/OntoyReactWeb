import React, { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar'; // Importar Navbar
import Footer from '../components/Footer'; // Importar Footer
import './css/register.css'; // Estilos
import { registerClass } from '../api/schedule'; // Función para registrar clase
import { Button } from 'react-bootstrap'; // Usar Button de react-bootstrap
import { useNavigate } from 'react-router-dom'; // Para la navegación

const RegisterClass = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        profesor: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [classes, setClasses] = useState([]); // Para almacenar las clases registradas
    const navigate = useNavigate(); // Para la navegación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerClass(formData);
            setSuccessMessage('Clase registrada con éxito.');
            setErrorMessage('');
            setFormData({ nombre: '', profesor: '' });
            console.log('Clase registrada:', data);
            // Aquí podemos agregar la clase a la lista de clases registradas (si es necesario)
            setClasses([...classes, formData]);
        } catch (error) {
            if (error.response?.status === 400) {
                setErrorMessage(error.response.data.message || 'La clase ya existe.');
            } else {
                setErrorMessage('Error al registrar la clase. Inténtalo nuevamente.');
            }
            console.error('Error al registrar la clase:', error);
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#35ace4'; // Fondo azul claro
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className='w-100 vh-100'>
            <AppNavbar />
            <div className='vh-100 d-flex align-content-center flex-nowrap'>
                <div className="register-container h-50 ">
                    {/* Navbar */}


                    {/* Contenido principal */}
                    <main className="register-content">
                        <header className="register-header text-center">
                            <h2>Registro de Clase</h2>
                        </header>

                        {successMessage && <p className="success-message alert alert-success">{successMessage}</p>}
                        {errorMessage && <p className="error-message alert alert-danger">{errorMessage}</p>}

                        {/* Formulario de registro */}
                        <section className="register-form-section container">
                            <form onSubmit={handleSubmit} className="form-container">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre de la Clase:</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="profesor">Profesor:</label>
                                    <input
                                        type="text"
                                        id="profesor"
                                        name="profesor"
                                        value={formData.profesor}
                                        onChange={handleChange}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <Button variant="primary" type="submit" className="btn-submit">
                                    Registrar Clase
                                </Button>
                            </form>
                        </section>
                    </main>

                    {/* Footer */}

                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterClass;
