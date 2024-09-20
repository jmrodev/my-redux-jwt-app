import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode }from 'jwt-decode'; // Cambia a esta importación

export const loginUserThunk = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/api/login', credentials);
    const { token } = response.data;

    const decodedToken = jwtDecode(token);
    const { permissions, user } = decodedToken; // Suponiendo que el payload tiene 'permissions'

    dispatch(loginSuccess({ user, token, permissions }));
  } catch (error) {
    dispatch(setError('Login failed. Please check your credentials.'));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    token: null,
    permissions: [],
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.permissions = action.payload.permissions;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.permissions = [];
    },
    setError(state, action) {
      // Manejo de errores (puedes agregar más lógica aquí si lo deseas)
      console.error(action.payload);
    },
  },
});

// Exportar las acciones
export const { loginSuccess, logoutUser, setError } = authSlice.actions;

// Exportar el reducer
export const authReducer = authSlice.reducer;

export default authSlice.reducer; // O puedes exportar solo el reducer por defecto
