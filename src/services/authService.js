import axios from 'axios';

const API_URL = 'localhost:3000/auth/api'; // Ajusta según tu configuración

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Debería retornar el token y la información del usuario
};

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; // Debería retornar la información del usuario creado
};

export const logout = () => {
  // Aquí puedes implementar la lógica para cerrar sesión,
  // como eliminar el token del almacenamiento local o las cookies
  localStorage.removeItem('access_token'); // Si usas localStorage
  // o también puedes limpiar cookies si es necesario
};

// Puedes agregar más funciones para manejar la validación de tokens o
// para obtener el estado del usuario autenticado si es necesario.
