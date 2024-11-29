import React, { useEffect, useState } from "react";
import * as Components from './Inicio-style.jsx';
import { useAuth } from "../contexts/AuthContext.jsx";
import { useTenant } from "../contexts/TenantContext";
import './inicio.css'

function Inicio() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [signIn, setSignIn] = useState(true);
  const { login, register } = useAuth();
  const { tenantInfo } = useTenant();
  const [credentials, setCredentials] = useState({ user_id: "", password: "" });
  const [productos, setProductos] = useState([]);  

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

  useEffect(() => {
    if (tenantInfo) {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `https://3j1d1u98t7.execute-api.us-east-1.amazonaws.com/dev/inventory/names?tenant_id=${tenantInfo.tenantId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();

          console.log("Api response:", data);

          if (response.ok && data.body) {
            // Parse the body if it is a string
          const inventories = Array.isArray(data.body) ? data.body : JSON.parse(data.body);

          // Log parsed inventories
          console.log("Parsed inventories:", inventories[0]);

          if (inventories.length > 0) {
            setProductos(inventories[0]);

            const { inventory_id, tenant_id } = inventories[0];

            // Fetch the details of the first inventory
            const detailsResponse = await fetch(
              `https://3j1d1u98t7.execute-api.us-east-1.amazonaws.com/dev/inventory/list?tenant_id=${tenant_id}&inventory_id=${inventory_id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const detailsData = await detailsResponse.json();

            if (detailsResponse.ok && detailsData.body) {
              const detailedProducts = Array.isArray(detailsData.body) ? detailsData.body : JSON.parse(detailsData.body);

              console.log("First inventory details:", detailedProducts);

              setProductos(detailedProducts);
            } else {
              console.error("Failed to fetch inventory details:", detailsData.message);
            }
          } else {
            console.error("No inventories found");
          }
        } else {
          console.error("API response not OK or body missing");
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

      fetchProducts();
    }
  }, [tenantInfo]);

  return (
    <div style={{ padding: '20px' }}>
      {isAuthenticated ? (
        // Si el usuario está autenticado, mostramos los productos
        <div>
          <h1>Productos</h1>
          <div style={styles.gridContainer}>
            {productos.length > 0 ? (
              productos.map((producto, index) => (
                <div key={index} style={styles.card}>
                  <h3>{`Producto ID: ${producto.product_id}`}</h3>
                  <p>{`Stock: ${producto.stock}`}</p>
                  <p>{`Observaciones: ${producto.observaciones}`}</p>
                </div>
              ))
            ) : (
              <p>Cargando productos...</p>
            )}
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Inicio;
