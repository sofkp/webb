import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantInfo, setTenantInfo] = useState(null);

  return (
    <TenantContext.Provider value={{ tenantInfo, setTenantInfo }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  return useContext(TenantContext);
};