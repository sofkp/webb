import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {Container, Title, PaymentsContainer} from './Payment-style'

const Payments = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const response = await fetch('https://example.com/payments');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Payments</Title>
      <PaymentsContainer>
        <div>LISTA DE PAGOS</div>
      </PaymentsContainer>
    </Container>
  );
};

export default Payments;