import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Inicio from "./login-register/LRPage";
import Products from "./productos/Productos";
import Orders from "./ordenes/Orden";
import Payments from "./payment/Payment";
import { AuthProvider } from "./contexts/AuthContext";
import './index.css';
import Navbarr from './navbar/Navbar';
import LandingPage from './landing/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductPage from './productos/ProductoPage';
import { TokenProvider } from './contexts/TokenContext';
import { TenantProvider } from './contexts/TenantContext'

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
        <Route path="/orders" element={<Orders />} />
        <Route path="/payments" element={<Payments />} />
        <Route path='/product' element={<ProductPage/>} />
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
      <AuthProvider>
        <TokenProvider>
          <BrowserRouter>
            <MainRoutes />
          </BrowserRouter>
        </TokenProvider>
      </AuthProvider>
    </TenantProvider>
  </React.StrictMode>
  </QueryClientProvider>
);
