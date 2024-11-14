import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {Container, Title, OrdersContainer} from './Orden-style'

const Orden = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch('https://example.com/orders');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <Title>Orders</Title>
      <OrdersContainer>
        <div>LISTA DE ORDENES</div>
      </OrdersContainer>
    </Container>
  );
};

export default Orden;