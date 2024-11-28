import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Inicio from "./inicio/Inicio";
import Products from "./productos/Productos";
import Orders from "./ordenes/Orden";
import Payments from "./payment/Payment";
import Inventory from "./inventory/Inventory";
import NewProduct from "./productos/NuevoProducto";
import {AuthProvider} from "./contexts/AuthContext";
import './index.css'
import Navbarr from './navbar/Navbar';
import { TenantProvider, useTenant } from './contexts/TenantContext';
import LandingPage from './landing/LandingPage';

const MainRoutes = () => {
  const { setTenantInfo, tenantInfo } = useTenant();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tenant = window.location.pathname.split('/')[1];

    if (tenant && tenant !== tenantInfo && tenant != 'inicio') {
      setTenantInfo(tenant);
      navigate('/inicio');
    } else if (!tenant && !tenantInfo) {
      navigate('/');
    }
  }, [setTenantInfo, tenantInfo, navigate]);

  // Renderizar la LandingPage si no hay tenant en la URL ni en el estado
  if (!tenantInfo && location.pathname === '/') {
    return <LandingPage />;
  }

  return (
    <>
      <div className="navbar-wrapper">
        <Navbarr />
      </div>
      <Routes>
        <Route path="/" element={tenantInfo ? <Navigate to="/inicio" replace /> : <LandingPage />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TenantProvider>
      <AuthProvider>
        <BrowserRouter>
          <MainRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TenantProvider>
  </React.StrictMode>
);