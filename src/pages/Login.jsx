import { useState } from 'react';
import { login } from '../api/auth';
import './Login.css';
import escudoEscom from '../assets/img/escudoESCOM.png';

const Login = () => {
    const [boleta, setBoleta] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(boleta, password);
            localStorage.setItem('user', JSON.stringify(data));
            console.log('Usuario logueado:', data);
            setErrorMessage(''); // Limpiar el mensaje de error si el login fue exitoso
        } catch (error) {
            console.error('Error en el login', error);
            setErrorMessage(error.response?.data?.message || 'Error en el inicio de sesión. Inténtalo de nuevo.'); // Establecer el mensaje de error
        }
    };

    return (
        <div className='chart-login'>
            <i id='icon-user' className="fa-solid fa-user-circle"></i>
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar mensaje de error */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="boleta">Boleta:</label>
                    <input
                        type="text"
                        id="boleta"
                        value={boleta}
                        onChange={(e) => setBoleta(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <a href="/register">Registrarse</a>
            </form>
            
            <img src={escudoEscom} alt="" />
        </div>
    );
};

export default Login;
