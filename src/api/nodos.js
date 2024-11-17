import axios from 'axios';

const API_URL = "http://localhost:3000";

export const obtenerNodos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/obtenerNodos`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data.nodos;
  } catch (error) {
    console.error("Error al obtener los nodos del mapa:", error.response ? error.response.data : error.message);
    throw error;
  }
};