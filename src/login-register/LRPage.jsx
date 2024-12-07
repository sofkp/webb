import React, { useState, useEffect } from "react";
import * as Components from './LRPage-style.jsx';
import { useNavigate } from 'react-router-dom';
import './lrpage.css';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useToken } from "../contexts/TokenContext.jsx";
import { useTenant } from "../contexts/TenantContext.jsx";
import Notification from "./Notification";

function Inicio() {
  const [signIn, setSignIn] = useState(true);
  const { setUserID } = useAuth();
  const { tenantID } = useTenant();
  const { setToken } = useToken();
  const [credentials, setCredentials] = useState({ tenant_id: tenantID, user_id: "", password: "" });
  const [notifications, setNotifications] = useState([]);
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

  const addNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 7000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(
        "https://bfh1meojk2.execute-api.us-east-1.amazonaws.com/prod/user/login",
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
        "https://bfh1meojk2.execute-api.us-east-1.amazonaws.com/prod/user/register",
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
        const token = response.token;
        setToken(token);
        setUserID(credentials.user_id);
        navigate('/products');
      }
    } catch (error) {
      addNotification("Error al iniciar sesión", "error");
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(credentials);
      addNotification("Registro exitoso. Por favor, inicia sesión.", "success");
    } catch (error) {
      addNotification("Error en el registro", "error");
    }
  };

  return (
    <div className="inicio">
      {notifications.map((notif) => (
        <Notification
          key={notif.id}
          message={notif.message}
          type={notif.type}
          onClose={() => removeNotification(notif.id)}
        />
      ))}

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