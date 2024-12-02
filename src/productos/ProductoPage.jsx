import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProductContainer, ProductImage, ProductDetails } from './Producto-style';

const ProductPage = () => {
  const location = useLocation();
  const { token, tenantID } = useAuth();
  const { product_name } = location.state || {};
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (tenantID && product_name) {
      fetch(
        `https://jd3nutybah.execute-api.us-east-1.amazonaws.com/prod/product/search?tenant_id=${tenantID}&product_name=${product_name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [tenantID, product_name, token]);

  if (!product) return <div>Loading...</div>;

  return (
    <ProductContainer>
      <ProductImage src={product.image} alt={product.name} />
      <ProductDetails>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </ProductDetails>
    </ProductContainer>
  );
};

export default ProductPage;
