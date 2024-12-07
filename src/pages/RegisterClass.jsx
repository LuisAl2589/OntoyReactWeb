import { useState } from 'react';
import { useEffect } from 'react';
import './css/register.css';
import { registerClass } from '../api/schedule';

const RegisterClass = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        profesor: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

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
        document.body.style.backgroundColor = '#35ace4';
        return () => {
          document.body.style.backgroundColor = '';
        };
    }, []);

    return (
        <div className="register-container">
            <h2>Registro de Clase</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre de la Clase:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="profesor">Profesor:</label>
                    <input
                        type="text"
                        id="profesor"
                        name="profesor"
                        value={formData.profesor}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Registrar Clase</button>
            </form>
        </div>
    );
};

export default RegisterClass;