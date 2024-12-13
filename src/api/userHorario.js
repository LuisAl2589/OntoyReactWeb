import axios from 'axios';
import api from './api';
const API_URL = "http://localhost:3000";

// Función para agregar la clase al horario del usuario
export const agregarClaseAlHorario = async (classId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;  // Obtener el token del localStorage
    console.log("Token en localStorage:", token);
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }
  
    try {
      const response = await api.post(
        `${API_URL}/agregarClassUser`,  // Esta ruta asocia la clase al horario del usuario logueado
        { id_clase: classId },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar el token en las cabeceras
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al agregar la clase al horario:", error);
      throw error;
    }
  };