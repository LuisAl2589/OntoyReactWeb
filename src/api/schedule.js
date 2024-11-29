/* eslint-disable react/prop-types */

import api from './api';

const API_URL = "http://localhost:3000";

// Registrar una nueva clase
export const registerClass = async (data) => {
  try {
    const response = await api.post(`${API_URL}/clases`, data);
    return response.data;
  } catch (error) {
    console.error("Error al registrar la clase:", error);
    throw error;
  }
};

// Obtener todas las clases disponibles
export const fetchClasses = async () => {
  try {
    const response = await api.get(`${API_URL}/clases`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar las clases:", error);
    throw error;
  }
};

// Registrar un nuevo horario
export const registerSchedule = async (data) => {
  try {
    const response = await api.post(`${API_URL}/horarios`, {horarios:data});
    return response.data;
  } catch (error) {
    console.error("Error al registrar el horario:", error);
    throw error;
  }
};