import styled from 'styled-components';

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f9f9f9;
`;

export const ProductImage = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const ProductDetails = styled.div`
  text-align: center;

  h1 {
    color: #231123;
  }

  p {
    color: #444;
    margin: 1rem 0;
  }

  h3 {
    color: #dd7596;
  }
`;

export const CommentsContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f1f1;
  border-radius: 10px;

  h2 {
    color: #231123;
  }

  p {
    margin: 0.5rem 0;
    color: #444;
  }
`;
