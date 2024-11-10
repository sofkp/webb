import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './inicio/Inicio.jsx';
import "./index.css";
import Barra from './navbar/Navbar.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Barra />
    <Inicio />
  </React.StrictMode>
);
