import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Inicio from "./login-register/LRPage";
import Products from "./productos/Productos";
import Orders from "./ordenes/Orden";
import Payments from "./payment/Payment";
import Inventory from "./inventory/Inventory";
import NewProduct from "./productos/NuevoProducto";
import { AuthProvider } from "./contexts/AuthContext";
import './index.css';
import Navbarr from './navbar/Navbar';
import { TenantProvider } from './contexts/TenantContext';
import LandingPage from './landing/LandingPage';
import { TokenProvider } from './contexts/TokenContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MainRoutes = () => {
  const location = useLocation();
 
  const showNavbar = location.pathname !== '/' && location.pathname !== '/inicio';

  return (
    <>
      {showNavbar && (
        <div className="navbar-wrapper">
          <Navbarr />
        </div>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/new" element={<NewProduct />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:inventoryID" element={<Inventory />} />
      </Routes>
    </>
  );
};

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <TenantProvider>
      <TokenProvider>
        <AuthProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TokenProvider>
    </TenantProvider>
  </React.StrictMode>
  </QueryClientProvider>
);
