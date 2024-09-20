import {jwtDecode} from 'jwt-decode';

/**
 * Almacena el token JWT en localStorage o cookies (dependiendo de tu estrategia).
 * @param {string} token - El token JWT.
 */
export const storeToken = (token) => {
  localStorage.setItem('access_token', token);
  // O si prefieres usar cookies:
  // document.cookie = `access_token=${token}; path=/; secure; HttpOnly`;
};

/**
 * Obtiene el token JWT desde localStorage o cookies.
 * @returns {string|null} El token si existe, de lo contrario null.
 */
export const getToken = () => {
  return localStorage.getItem('access_token');
  // O si prefieres usar cookies:
  // const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
  // return match ? match[2] : null;
};

/**
 * Elimina el token JWT de localStorage o cookies.
 */
export const removeToken = () => {
  localStorage.removeItem('access_token');
  // O si usas cookies:
  // document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
};

/**
 * Decodifica un token JWT para extraer el payload.
 * @param {string} token - El token JWT.
 * @returns {object|null} El payload del token decodificado o null si el token es inválido.
 */
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Token decoding failed', error);
    return null;
  }
};

/**
 * Verifica si un token JWT ha expirado.
 * @param {string} token - El token JWT.
 * @returns {boolean} true si el token ha expirado, false en caso contrario.
 */
export const isTokenExpired = (token) => {
  const decodedToken = decodeToken(token);
  if (!decodedToken) {
    return true;
  }

  const currentTime = Date.now() / 1000; // Tiempo actual en segundos
  return decodedToken.exp < currentTime;
};

/**
 * Obtiene los permisos del token JWT.
 * @param {string} token - El token JWT.
 * @returns {array|null} Los permisos si están presentes en el token, de lo contrario null.
 */
export const getPermissionsFromToken = (token) => {
  const decodedToken = decodeToken(token);
  return decodedToken ? decodedToken.permissions : null;
};

/**
 * Verifica si el token tiene un permiso específico.
 * @param {string} token - El token JWT.
 * @param {string} permission - El permiso que quieres verificar.
 * @returns {boolean} true si el token tiene el permiso, de lo contrario false.
 */
export const hasPermission = (token, permission) => {
  const permissions = getPermissionsFromToken(token);
  return permissions ? permissions.includes(permission) : false;
};
