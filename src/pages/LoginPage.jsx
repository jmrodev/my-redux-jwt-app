// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUserThunk } from '../features/authSlice';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserThunk(credentials));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
