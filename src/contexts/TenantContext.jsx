import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantID, setTenantID] = useState(null);
  const [inventoryID, setInventoryID] = useState(null);

  const saveTenantInfo = (tenant, inventory) => {
    setTenantID(tenant);
    setInventoryID(inventory);
  };

  return (
    <TenantContext.Provider value={{ tenantID, inventoryID, saveTenantInfo }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
