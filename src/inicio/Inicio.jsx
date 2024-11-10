import React, { useState } from "react";
import * as Components from './Inicio-style.jsx';

function Inicio() {
  const [signIn, setSignIn] = useState(true);

  return (
    <Components.Container>
      <Components.SignUpContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Regístrate</Components.Title>
          <Components.Input type="text" placeholder="Usuario" />
          <Components.Input type="password" placeholder="Contraseña" />
          <Components.Button2>Registrarme</Components.Button2>
        </Components.Form>
      </Components.SignUpContainer>

      <Components.SignInContainer signinIn={signIn}>
        <Components.Form>
          <Components.Title>Iniciar Sesión</Components.Title>
          <Components.Input type="text" placeholder="Usuario" />
          <Components.Input type="password" placeholder="Contraseña" />
          <Components.Button>Iniciar Sesión</Components.Button>
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
            ¡No te preocupes! Crea una cuenta súper facil
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
