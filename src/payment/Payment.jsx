import React, { useState, useEffect } from 'react';
import { Container, Title, PaymentsContainer, Table, TableHeader, TableRow, TableCell } from './Payment-style';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';

const Payments = () => {
  const { tenantID } = useTenant();
  const { userID } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `https://4q2d5wu971.execute-api.us-east-1.amazonaws.com/prod/pago/list?user_id=${userID}&tenant_id=${tenantID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setPayments(data.body?.orders || []);
    } catch (error) {
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [tenantID, userID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Payments</Title>
      <PaymentsContainer>
        <div>Lista de Pagos</div>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Pago ID</TableHeader>
              <TableHeader>Fecha de Pago</TableHeader>
              <TableHeader>Order ID</TableHeader>
              <TableHeader>Total</TableHeader>
              <TableHeader>Dirección de Facturación</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <TableRow key={payment.pago_id}>
                <TableCell>{payment.pago_id}</TableCell>
                <TableCell>{new Date(payment.fecha_pago).toLocaleString()}</TableCell>
                <TableCell>{payment.order_id}</TableCell>
                <TableCell>{payment.total}</TableCell>
                <TableCell>{payment.user_info.billing_address}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </PaymentsContainer>
    </Container>
  );
};

export default Payments;
