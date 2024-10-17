const API_URL = "https://reqres.in/api";
export const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error("Error al iniciar sesión");
      }
  
      const data = await response.json();''
      return data; // Devuelve el token del usuario
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw error;
    }
  };