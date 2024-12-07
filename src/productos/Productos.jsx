import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { useTenant } from '../contexts/TenantContext';
import { useToken } from '../contexts/TokenContext';
import { ProductContainer, ProductImage, ProductDetails } from './Producto-style';
import noImage from "../assets/no-image.svg";

const Productos = () => {
  const { productData, clearProductData } = useProduct();
  const { token } = useToken();
  const { tenantID } = useTenant();
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(noImage);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!tenantID || (!productData.product_id && !productData.product_name)) return;

      const searchParam = productData.product_id
        ? `product_id=${productData.product_id}`
        : `product_name=${productData.product_name}`;

      try {
        const response = await fetch(
          `https://m55h5qlclj.execute-api.us-east-1.amazonaws.com/prod/product/search?tenant_id=${tenantID}&${searchParam}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        setProduct(data.body[0]);

        // Fetch product image
        try {
          const imageResponse = await fetch(
            `https://m55h5qlclj.execute-api.us-east-1.amazonaws.com/prod/product/foto?tenant_id=${tenantID}&product_id=${data.body[0]?.product_id}`
          );
          if (imageResponse.ok) {
            const imageUrl = await imageResponse.text();
            setProductImage(imageUrl || noImage);
          }
        } catch {
          setProductImage(noImage);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    return () => clearProductData();
  }, [tenantID, productData, token, clearProductData]);

  if (!product) return <div>Cargando producto...</div>;

  return (
    <ProductContainer>
      <ProductImage src={productImage} alt={product.product_name} />
      <ProductDetails>
        <h1>{product.product_name}</h1>
        <p>{product.product_info.features}</p>
        <h3>${product.product_price}</h3>
        <p>Categoría: {product.product_info.category}</p>
      </ProductDetails>
    </ProductContainer>
  );
};

export default Productos;
