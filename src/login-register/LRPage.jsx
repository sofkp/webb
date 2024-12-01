import React, { useEffect, useState } from "react";
import * as Components from './LRPage-style.jsx';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTenant } from "../contexts/TenantContext.jsx";
import './lrpage.css'

function Inicio() {
  const { tenantID, inventoryID } = useTenant();
  const [signIn, setSignIn] = useState(true);
  const { login, register } = useAuth();
  const [credentials, setCredentials] = useState({ tenant_id: tenantID, user_id: "", password: "" });

  const styles = {
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    card: {
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "15px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      transition: "transform 0.2s ease-in-out",
      cursor: "pointer",
    },
    cardHover: {
      transform: "scale(1.05)",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      alert("Logged in successfully!");
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(credentials);
      alert("Registered successfully!");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
        <Components.Container>
          <Components.SignUpContainer signinIn={signIn}>
            <Components.Form onSubmit={handleRegister}>
              <Components.Title>Regístrate {tenantInfo && `a ${tenantInfo.tenantId}`}</Components.Title>
              <Components.Input
                type="text"
                name="user_id"
                placeholder="Usuario"
                value={credentials.user_id}
                onChange={handleInputChange}
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleInputChange}
              />
              <Components.Button2 type="submit">Registrarme</Components.Button2>
            </Components.Form>
          </Components.SignUpContainer>

          <Components.SignInContainer signinIn={signIn}>
            <Components.Form onSubmit={handleLogin}>
              <Components.Title>Iniciar Sesión {tenantInfo && `en ${tenantInfo.tenantId}`}</Components.Title>
              <Components.Input
                type="text"
                name="user_id"
                placeholder="Usuario"
                value={credentials.user_id}
                onChange={handleInputChange}
              />
              <Components.Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={credentials.password}
                onChange={handleInputChange}
              />
              <Components.Button type="submit">Iniciar Sesión</Components.Button>
            </Components.Form>
          </Components.SignInContainer>

          <Components.OverlayContainer signinIn={signIn}>
            <Components.Overlay signinIn={signIn}>
              <Components.LeftOverlayPanel signinIn={signIn}>
                <Components.Title>¿Ya tienes cuenta?</Components.Title>
                <Components.Paragraph>
                  ¡Bienvenido de vuelta! Ingresa aquí para comenzar
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(true)}>
                  Iniciar Sesión
                </Components.GhostButton>
              </Components.LeftOverlayPanel>

              <Components.RightOverlayPanel signinIn={signIn}>
                <Components.Title>¿No tienes cuenta?</Components.Title>
                <Components.Paragraph>
                  ¡No te preocupes! Crea una cuenta súper fácil
                </Components.Paragraph>
                <Components.GhostButton onClick={() => setSignIn(false)}>
                  Regístrate
                </Components.GhostButton>
              </Components.RightOverlayPanel>
            </Components.Overlay>
          </Components.OverlayContainer>
        </Components.Container>
    </div>
  );
}

export default Inicio;