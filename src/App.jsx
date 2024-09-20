// src/App.jsx
import React from 'react';
import { Provider } from 'react-redux';
import  store  from './app/store';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>App</h1>
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;

