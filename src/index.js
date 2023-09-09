import React from 'react';
import { createRoot } from 'react-dom'; // Importa createRoot en lugar de ReactDOM
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
