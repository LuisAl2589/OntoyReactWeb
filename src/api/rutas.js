import api from './api';

export const obtenerRuta = async (nodoOrigen, nodoDestino) => {
  try {
    const response = await api.get(`/api/ruta?nodoOrigen=${nodoOrigen}&nodoDestino=${nodoDestino}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener la ruta del mapa:", error.response ? error.response.data : error.message);
    throw error;
  }
};
