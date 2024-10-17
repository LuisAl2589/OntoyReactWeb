import React, { useState } from 'react';
import { login } from '../api/auth';
import './Login.css';
import escudoEscom from '../assets/img/escudoESCOM.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('user', JSON.stringify(data));
      console.log('Usuario logueado:', data);
    } catch (error) {
      console.error('Error en el login', error);
    }
    };

    return (
        <div className='chart-login'>
            <i id='icon-user' class="fa-solid fa-user-circle"></i>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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