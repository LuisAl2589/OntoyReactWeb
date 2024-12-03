import { useState, useEffect } from 'react';
import './css/horario.css';
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
    const [classes, setClasses] = useState([]);
    const [ nodos, setNodos] = useState([]);

    useEffect(() => {
        // Cargar clases disponibles
        const fetchNodos = async() => {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("fallo ", formData);
            const data = await registerSchedule(formData);
            
            console.log('Horario registrado:', data);
            setErrorMessage('');
        } catch (error) {
            console.error('Error al registrar el horario', error);
            setErrorMessage(error.response?.data?.message || 'Error al registrar el horario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="register-container">
            <h2>Registro de Horario</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        </div>
    );
};

export default RegisterSchedule;