import React, { useState, useEffect } from "react";
import { Container, Title, OrdersContainer, OrdersTable, TableRow, TableHeader, TableCell } from "./Orden-style";
import { useAuth } from "../contexts/AuthContext";
import { useToken } from "../contexts/TokenContext";
import { useTenant } from "../contexts/TenantContext";

const Orden = () => {
  const { tenantID } = useTenant();
  const { userID } = useAuth();
  const { token } = useToken();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `hhttps://7gd9qd08nk.execute-api.us-east-1.amazonaws.com/prod/orden/list?tenant_id=${tenantID}&user_id=${userID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const result = await response.json();
      const parsedBody =
        typeof result.body === "string" ? JSON.parse(result.body) : result.body;
      if (!parsedBody.orders) {
        throw new Error("Orders not found");
      }
      setOrders(parsedBody.orders);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [tenantID, userID, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <Container>
      <Title>Ordenes</Title>
      <OrdersContainer>
        <OrdersTable>
          <thead>
            <TableRow>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Información</TableHeader>
              <TableHeader>Productos</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Status</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>
                  {order.user_info?.user_phone || "N/A"}, {order.user_info?.user_address || "N/A"}
                </TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.product_id} - Cantidad: {product.quantity}
                    </div>
                  ))}
                </TableCell>
                <TableCell>${order.total_price?.toFixed(2) || "N/A"}</TableCell>
                <TableCell>{order.order_status || "N/A"}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </OrdersTable>
      </OrdersContainer>
    </Container>
  );
};

export default Orden;
