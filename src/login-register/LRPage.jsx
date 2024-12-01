import React, { useState, useEffect } from "react";
import * as Components from './LRPage-style.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import './lrpage.css';
import { useToken } from "../contexts/TokenContext.jsx";

function Inicio() {
  const location = useLocation();
  const { tenantID, inventoryID } = location.state;
  const [signIn, setSignIn] = useState(true);
  const { setToken } = useToken();
  const [credentials, setCredentials] = useState({ tenant_id: tenantID, user_id: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('inicio-body');

    return () => {
      document.body.classList.remove('inicio-body');
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(
        "https://0w7xbgvz6f.execute-api.us-east-1.amazonaws.com/test/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await fetch(
        "https://0w7xbgvz6f.execute-api.us-east-1.amazonaws.com/test/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(credentials);
      if (response.statusCode === 200) {
        const token = response.data.token;
        setToken(token);
        navigate('/products', { state: { tenantID, inventoryID, token } });
      }
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
    <div className="inicio">
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleRegister}>
            <Components.Title>Regístrate {tenantID && `a ${tenantID}`}</Components.Title>
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
            <Components.Title>Iniciar Sesión {tenantID && `en ${tenantID}`}</Components.Title>
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