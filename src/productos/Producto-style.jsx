import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 1rem;
`;

export const ProductName = styled.h3`
  color: #82204A;
  margin-bottom: 0.5rem;
`;

export const ProductPrice = styled.p`
  color: #558c8c;
  font-weight: bold;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #82204A;
`;