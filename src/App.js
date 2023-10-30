import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeAdmin from './pages/HomeAdmin';
import LoginForm from './pages/LoginForm';
import ProductList from './Components/ProductList';
import Venta from './Components/Venta';
import { AuthProvider } from './Components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/homeAdmin" element={<HomeAdmin rol={"administrador"}/>}/>
          <Route path="/home" element={<HomeAdmin/>}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
