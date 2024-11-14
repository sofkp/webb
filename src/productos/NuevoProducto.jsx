import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, FormContainer, Title, Input, Button} from './Nuevoproducto-style'

const NuevoProducto = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Product created successfully');
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container>
      <Title>Create New Product</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">Nombre del producto</label>
            <Input
              id="productName"
              type="text"
              placeholder="Nombre del producto"
            />
            <label htmlFor="price">Precio del producto</label>
            <Input
              id="price"
              type="text"
              placeholder="Precio"
            />
          </div>
          <Button type="submit">
            Crar Producto
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default NuevoProducto;