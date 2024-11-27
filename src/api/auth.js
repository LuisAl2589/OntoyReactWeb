/* eslint-disable react/prop-types */
import axios from 'axios';
const API_URL = "http://localhost:3000";
import { jwtDecode  } from 'jwt-decode';
import api from './api';
export const getUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
        console.error('Error al obtener el usuario de localStorage:', error);
        return null;
    }
};
const verifyTokenWithBackend = async (token) => {
    try {    
        const response = await api.post('/verificarToken', { token });
        return response.status === 200; //Asume que el backend devuelve 200 si es válido
    } catch (error) {
        console.error('Token inválido:', error.response?.data || error.message);
        return false;
    }
};

export const isAuthenticated = async () => {
    const user = getUser();
    if (!user?.token || !isTokenValid(user.token)) return false;
    //Verificar con el backend
    const isValidBackend = await verifyTokenWithBackend(user.token);
    return isValidBackend;
};


export const isAdmin = () => {
    const user = getUser();
    return isAuthenticated() && user?.boleta === 'admin077';
};

const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Compara la expiración con la fecha actual
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
    }
};
export const login = async (boleta, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      boleta,
      password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const signup = async (registro) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      registro
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const logoutUser = () => {
  localStorage.removeItem('user');
};

