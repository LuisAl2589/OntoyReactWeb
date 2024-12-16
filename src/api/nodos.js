import api from './api';

export const obtenerNodos = async () => {
  try {
    const response = await api.get('/api/obtenerNodos');
    return response.data.nodos;
  } catch (error) {
    console.error("Error al obtener los nodos del mapa:", error.response ? error.response.data : error.message);
    throw error;
  }
};
