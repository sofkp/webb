import React, { createContext, useContext, useState } from 'react';

const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantID, setTenantID] = useState(null);
  const [tenantLogo, setTenantLogo] = useState(null); 

  return (
    <TenantContext.Provider value={{ tenantID, setTenantID, tenantLogo, setTenantLogo }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
