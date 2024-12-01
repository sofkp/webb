import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantID, setTenantID] = useState(null);
  const [inventoryID, setInventoryID] = useState(null); 

  return (
    <TenantContext.Provider value={{ tenantID, setTenantID, inventoryID, setInventoryID }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
