// src/pages/HomePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isAuthenticated ? (
        <div>
          <h2>Hello, {user.username}!</h2>
          <p>Your role: {user.role}</p>
        </div>
      ) : (
        <p>Please log in to see your information.</p>
      )}
    </div>
  );
};

export default HomePage;
