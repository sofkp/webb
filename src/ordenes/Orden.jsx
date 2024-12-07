import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  OrdersContainer,
  OrdersTable,
  TableRow,
  TableHeader,
  TableCell,
} from "./Orden-style";
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
        `https://qxtr9gpru1.execute-api.us-east-1.amazonaws.com/prod/orden/list?tenant_id=${tenantID}&user_id=${userID}`,
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

  const fetchProductNames = async (productIDs) => {
    const productNames = {};
    await Promise.all(
      productIDs.map(async (productID) => {
        try {
          const response = await fetch(
            `https://zpdzsk2xof.execute-api.us-east-1.amazonaws.com/prod/product/search?tenant_id=${tenantID}&product_id=${productID}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) throw new Error(`Failed to fetch product: ${productID}`);
          const result = await response.json();
          const parsedBody =
            typeof result.body === "string" ? JSON.parse(result.body) : result.body;
          if (parsedBody && parsedBody.length > 0) {
            productNames[productID] = parsedBody[0].product_name;
          } else {
            productNames[productID] = "Unknown Product";
          }
        } catch {
          productNames[productID] = "Unknown Product";
        }
      })
    );
    return productNames;
  };

  const mapProductNamesToOrders = async () => {
    const allProductIDs = orders.flatMap((order) =>
      order.products.map((product) => product.product_id)
    );

    const uniqueProductIDs = [...new Set(allProductIDs)];
    const productNames = await fetchProductNames(uniqueProductIDs);

    const ordersWithNames = orders.map((order) => ({
      ...order,
      products: order.products.map((product) => ({
        ...product,
        product_name: productNames[product.product_id] || "Unknown Product",
      })),
    }));

    setOrders(ordersWithNames);
  };

  useEffect(() => {
    fetchOrders();
  }, [tenantID, userID, token]);

  useEffect(() => {
    if (orders.length > 0) {
      mapProductNamesToOrders();
    }
  }, [orders]);

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
                  {order.user_info?.user_phone || "N/A"},{" "}
                  {order.user_info?.user_address || "N/A"}
                </TableCell>
                <TableCell>
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.product_name || "Unknown Product"} - Cantidad:{" "}
                      {product.quantity}
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
