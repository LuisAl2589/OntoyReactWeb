import React, { useState, useEffect } from 'react';
import AppNavbar from '../components/Navbar'; // Importar Navbar
import Footer from '../components/Footer'; // Importar Footer
import './css/register.css';
import { registerSchedule, fetchClasses } from '../api/schedule';
import { obtenerNodos } from '../api/nodos';

const RegisterSchedule = () => {
    const [formData, setFormData] = useState({
        dia: 'Lunes',
        hora_inicio: '',
        hora_fin: '',
        id_clase: '',
        id_nodo: '', // Aquí se puede poner el id del nodo, dependiendo de cómo lo manejes en el back-end.
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito
    const [classes, setClasses] = useState([]);
    const [nodos, setNodos] = useState([]);

    useEffect(() => {
        document.body.style.backgroundColor = '#35ace4';
        // Cargar clases disponibles
        const fetchNodos = async () => {
            try {
                const response = await obtenerNodos();
                setNodos(response);
            } catch (error) {
                console.error("Error al cargar las nodos", error);
                setErrorMessage("No se pudieron cargar las Nodos");
            }
        };

        const loadClasses = async () => {
            try {
                const response = await fetchClasses();
                setClasses(response);
            } catch (error) {
                console.error("Error al cargar las clases", error);
                setErrorMessage("No se pudieron cargar las clases");
            }
        };

        fetchNodos();
        loadClasses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrorMessage('');
        setSuccessMessage(''); // Limpiar mensaje de éxito al cambiar campos
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerSchedule(formData);
            console.log('Horario registrado:', data);
            setErrorMessage('');
            setSuccessMessage('Horario registrado con éxito.'); // Mostrar mensaje de éxito

            // Limpiar el formulario después de un registro exitoso
            setFormData({
                dia: 'Lunes',
                hora_inicio: '',
                hora_fin: '',
                id_clase: '',
                id_nodo: '',
            });

        } catch (error) {
            console.error('Error al registrar el horario', error);
            setErrorMessage(error.response?.data?.message || 'Error al registrar el horario. Inténtalo de nuevo.');
            setSuccessMessage(''); // Limpiar mensaje de éxito en caso de error
        }
    };

    return (
        <div className='w-100 vh-100'>
            <AppNavbar />
            <div className='vh-100 d-flex align-content-center flex-nowrap'>
                <div className="register-container vh-75">
                    <h2>Registro de Horario</h2>

                    {/* Mostrar mensaje de éxito si lo hay */}
                    {successMessage && <p className="success-message alert alert-success">{successMessage}</p>}

                    {/* Mostrar mensaje de error si lo hay */}
                    {errorMessage && <p className="error-message alert alert-danger">{errorMessage}</p>}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="dia">Día:</label>
                            <select
                                id="dia"
                                name="dia"
                                value={formData.dia}
                                onChange={handleChange}
                                required
                            >
                                <option value="Lunes">Lunes</option>
                                <option value="Martes">Martes</option>
                                <option value="Miercoles">Miércoles</option>
                                <option value="Jueves">Jueves</option>
                                <option value="Viernes">Viernes</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="hora_inicio">Hora de Inicio:</label>
                            <input
                                type="time"
                                id="hora_inicio"
                                name="hora_inicio"
                                value={formData.hora_inicio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="hora_fin">Hora de Fin:</label>
                            <input
                                type="time"
                                id="hora_fin"
                                name="hora_fin"
                                value={formData.hora_fin}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="id_clase">Clase:</label>
                            <select
                                id="id_clase"
                                name="id_clase"
                                value={formData.id_clase}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una clase</option>
                                {classes.map((clase) => (
                                    <option key={clase.id} value={clase.id}>
                                        {clase.nombre} - {clase.profesor}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="id_nodo">Nodo:</label>
                            <select
                                id="id_nodo"
                                name="id_nodo"
                                value={formData.id_nodo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un nodo</option>
                                {nodos.map((nodo) => (
                                    <option key={nodo.id} value={nodo.id}>
                                        {nodo.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Registrar Horario</button>
                    </form>

                    {/* Footer */}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterSchedule;
