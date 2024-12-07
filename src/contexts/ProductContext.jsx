import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState({ product_id: null, product_name: null });

  const setProductId = (id) => {
    setProductData((prev) => ({ ...prev, product_id: id, product_name: null }));
  };

  const setProductName = (name) => {
    setProductData((prev) => ({ ...prev, product_name: name, product_id: null }));
  };

  const clearProductData = () => {
    setProductData({ product_id: null, product_name: null });
  };

  return (
    <ProductContext.Provider
      value={{ productData, setProductId, setProductName, clearProductData }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
