import { createSlice } from '@reduxjs/toolkit';
import {login,register,logout} from '../services/authService';
import { storeToken, getToken, removeToken, decodeToken, isTokenExpired, getPermissionsFromToken } from '../utils/jwtUtils.js';

export const loginUserThunk = (credentials) => async (dispatch) => {
  try {
    // Llamada al servicio de autenticación para obtener el token
    const { token } = await login(credentials);

    // Almacenar el token (en localStorage o cookies, según tu preferencia)
    storeToken(token);

    // Decodificar el token para obtener información del usuario y sus permisos
    const decodedToken = decodeToken(token);
    const { permissions, user } = decodedToken;

    // Dispatch de la acción de login con la información del usuario, token y permisos
    dispatch(loginSuccess({ user, token, permissions }));
  } catch (error) {
    dispatch(setError('Login failed. Please check your credentials.'));
  }
};

// Thunk para verificar si el usuario ya está autenticado con un token almacenado
export const checkAuthStatus = () => (dispatch) => {
  const token = getToken();

  if (token && !isTokenExpired(token)) {
    // Si el token existe y no ha expirado, decodificarlo y obtener permisos
    const decodedToken = decodeToken(token);
    const { permissions, user } = decodedToken;

    dispatch(loginSuccess({ user, token, permissions }));
  } else {
    // Si el token ha expirado o no existe, hacer logout
    dispatch(logoutUser());
  }
};

// Slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    permissions: [],
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.permissions = action.payload.permissions;
    },
    logoutUser(state) {
      // Eliminar el token almacenado
      removeToken();
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.permissions = [];
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

// Exportar las acciones
export const { loginSuccess, logoutUser, setError } = authSlice.actions;

// Exportar el reducer
export const authReducer = authSlice.reducer;

export default authSlice.reducer;
