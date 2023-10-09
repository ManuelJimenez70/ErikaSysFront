import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes en lugar de Route
import HomeAdmin from './pages/HomeAdmin';
import LoginForm from './pages/LoginForm';
import ProductList from './Components/ProductList';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/homeAdmin" element={<HomeAdmin />}>
          <Route path="productos" element={<ProductList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
