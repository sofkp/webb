import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./inicio/Inicio";
import Products from "./productos/Productos";
import Orders from "./ordenes/Orden";
import Payments from "./payment/Payment";
import Inventory from "./inventory/Inventory";
import NewProduct from "./productos/NuevoProducto";
import {AuthProvider} from "./auth/Auth";
import './index.css'
import Navbarr from './navbar/Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <div className="navbar-wrapper">
        <Navbarr />
      </div>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<NewProduct />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
</React.StrictMode>
);
