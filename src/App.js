import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa Routes en lugar de Route
import HomeAdmin from './pages/HomeAdmin';
import LoginForm from './pages/LoginForm';
import { API_BASE_URL } from './apiConfig'; // Importa la constante aquí

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homeAdmin" element={<HomeAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
