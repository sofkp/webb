import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
    Container, 
    ProductGrid, 
    ProductCard, 
    ProductImage, 
    ProductInfo, 
    ProductName, 
    ProductPrice, 
    LoadingMessage
} from './Producto-style'

const Products = () => {
  const observerTarget = useRef(null);

  const fetchProducts = async ({ pageParam = 1 }) => {
    const response = await fetch(`https://example.com/products?page=${pageParam}`);
    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
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

  if (status === 'pending') return <LoadingMessage>Cargando...</LoadingMessage>;
  if (status === 'error') return <LoadingMessage>Error cargando productos</LoadingMessage>;

  return (
    <Container>
      <ProductGrid>
        {data?.pages.map((page) =>
          page.products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
              </ProductInfo>
            </ProductCard>
          ))
        )}
      </ProductGrid>
      <div ref={observerTarget} style={{ height: '40px' }} />
      {isFetchingNextPage && (
        <LoadingMessage>Cargando más productos...</LoadingMessage>
      )}
    </Container>
  );
};

export default Products;