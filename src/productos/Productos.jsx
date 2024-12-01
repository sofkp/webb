import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTenant } from "../contexts/TenantContext";
import {
  Container,
  ProductGrid,
  ProductCard,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductStock,
  LoadingMessage,
} from "./Producto-style";

const Products = () => {
  const observerTarget = useRef(null);
  const { tenantID, inventoryID } = useTenant();
  const [stockInfo, setStockInfo] = useState({});

  const fetchProducts = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://8y2hkh9bpk.execute-api.us-east-1.amazonaws.com/test/product/list?tenant_id=${tenantID}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.json();
  };

  const fetchStock = async (productID) => {
    try {
      const response = await fetch(
        `https://jh8liidnxa.execute-api.us-east-1.amazonaws.com/test/inventory/product?tenant_id=${tenantID}&product_id=${productID}&inventory_id=${inventoryID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.body?.stock || "N/A";
    } catch (error) {
      console.error(`Error fetching stock for product ${productID}:`, error);
      return "N/A";
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: fetchProducts,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (data?.pages) {
      const fetchAllStocks = async () => {
        const allProducts = data.pages.flatMap((page) => page.body);
        const stockPromises = allProducts.map(async (product) => {
          const stock = await fetchStock(product.product_id);
          return { id: product.product_id, stock };
        });
        const stockResults = await Promise.all(stockPromises);
        const stockMap = stockResults.reduce(
          (acc, { id, stock }) => ({ ...acc, [id]: stock }),
          {}
        );
        setStockInfo(stockMap);
      };
      fetchAllStocks();
    }
  }, [data, tenantID, inventoryID]);

  if (status === "loading") return <LoadingMessage>Cargando...</LoadingMessage>;
  if (status === "error")
    return <LoadingMessage>Error cargando productos</LoadingMessage>;

  return (
    <Container>
      <ProductGrid>
        {data?.pages.map((page) =>
          page.body.map((product) => (
            <ProductCard key={product.product_id}>
              <ProductImage
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
              <ProductInfo>
                <ProductName>{product.product_name}</ProductName>
                <ProductPrice>${product.product_price}</ProductPrice>
                <ProductStock>
                  Stock: {stockInfo[product.product_id] || "Cargando..."}
                </ProductStock>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>
      <div ref={observerTarget} style={{ height: "40px" }} />
      {isFetchingNextPage && (
        <LoadingMessage>Cargando más productos...</LoadingMessage>
      )}
    </Container>
  );
};

export default Products;
