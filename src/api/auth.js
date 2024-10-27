/* eslint-disable react/prop-types */
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
const API_URL = "http://localhost:3000";
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
    //console.error("Error en el inicio de sesión:", error.response ? error.response.data : error.message);
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
