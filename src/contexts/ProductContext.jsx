import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [productID, setproductID] = useState(null); 
  const [productName, setproductName] = useState(null); 

  return (
    <ProductContext.Provider value={{ productID, setproductID, productName, setproductName}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
