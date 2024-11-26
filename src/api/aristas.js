import api from './api';

export const obtenerAristas = async () => {
  try {
    const response = await api.get('/api/obtenerAristas');
    
    return response.data.aristas;
  } catch (error) {
    console.error("Error al obtener los nodos del mapa:", error.response ? error.response.data : error.message);
    throw error;
  }
};
