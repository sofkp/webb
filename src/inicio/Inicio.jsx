import React, { useState } from "react";
import * as Components from './Inicio-style.jsx';
import { useAuth } from "../auth/Auth";
import './inicio.css'

function Inicio() {
  const [signIn, setSignIn] = useState(true);
  const { login, register } = useAuth();
  const [credentials, setCredentials] = useState({ user_id: "", password: "" });

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
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form onSubmit={handleRegister}>
          <Components.Title>Regístrate</Components.Title>
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
          <Components.Title>Iniciar Sesión</Components.Title>
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
  );
}

export default Inicio;
