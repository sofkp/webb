import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import {Container,ProductGrid,ProductCard,ProductImage,ProductInfo,ProductName,
  ProductPrice,ProductStock,} from "./Productos-style";
import nophoto from "../assets/no-image.svg";
import { useToken } from "../contexts/TokenContext";
import { useTenant } from "../contexts/TenantContext";

const Products = () => {
  const observerTarget = useRef(null);
  const { tenantID } = useTenant();
  const { inventoryID } = useAuth();
  const { token } = useToken();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductsInventory = async () => {
    const response = await fetch(
      `https://oi5a9j62qi.execute-api.us-east-1.amazonaws.com/prod/inventory/products/list?tenant_id=${tenantID}&inventory_id=${inventoryID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  const fetchProductInfo = async (productID) => {
    try {
      const response = await fetch(
        `https://j7k35njq6j.execute-api.us-east-1.amazonaws.com/prod/product/search?tenant_id=${tenantID}&product_id=${productID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.body;
    } catch (error) {
      console.error(`Error fetching details for product ${productID}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const inventoryResponse = await fetchProductsInventory();
        const inventoryProducts = inventoryResponse.body || [];

        const productInfoPromises = inventoryProducts.map(async (product) => {
          const productDetails = await fetchProductInfo(product.product_id);
          return {
            ...product,
            ...productDetails,
          };
        });

        const detailedProducts = await Promise.all(productInfoPromises);
        setProductDetails(detailedProducts.filter((item) => item !== null));
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false); 
      }
    };

    fetchProductsData();
  }, [tenantID, inventoryID, token]);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;
  if (productDetails.length === 0)
    return <div>No hay productos disponibles.</div>;

  return (
    <Container>
      <ProductGrid>
        {productDetails.map((product) => (
          <ProductCard key={product.product_id}>
            <ProductImage
              src={product.image || nophoto}
              alt={product.product_name || "Producto"}
              loading="lazy"
            />
            <ProductInfo>
              <ProductName>{product.product_name || "Sin nombre"}</ProductName>
              <ProductPrice>${product.product_price || "N/A"}</ProductPrice>
              <ProductStock>
                Stock: {product.stock ?? "No disponible"}
              </ProductStock>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
      <div ref={observerTarget} style={{ height: "40px" }} />
    </Container>
  );
};

export default Products;
