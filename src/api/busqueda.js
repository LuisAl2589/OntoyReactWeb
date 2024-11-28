import api from './api';

export const buscar = async (query) => {
  try {
    const response = await api.get(`/api/buscar?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error al buscar:", error.response ? error.response.data : error.message);
    throw error;
  }
}