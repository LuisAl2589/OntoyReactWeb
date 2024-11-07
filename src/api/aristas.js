import axios from 'axios';

const API_URL = "http://localhost:3000";

export const obtenerAristas = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/obtenerAristas`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(response.data.aristas);
    
    return response.data.aristas;
  } catch (error) {
    console.error("Error al obtener los nodos del mapa:", error.response ? error.response.data : error.message);
    throw error;
  }
};
