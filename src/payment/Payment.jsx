import React, { useState, useEffect } from 'react';
import { Container, Title, PaymentsContainer, Table, TableHeader, TableRow, TableCell } from './Payment-style';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import { useToken } from '../contexts/TokenContext';

const Payments = () => {
  const { tenantID } = useTenant();
  const { userID } = useAuth();
  const { token } = useToken();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `https://658jvv3r8l.execute-api.us-east-1.amazonaws.com/prod/pago/list?user_id=${userID}&tenant_id=${tenantID}`,
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
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [tenantID, userID, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <Title>Pagos</Title>
      <PaymentsContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Pago ID</TableHeader>
              <TableHeader>Fecha de Pago</TableHeader>
              <TableHeader>Orden ID</TableHeader>
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
