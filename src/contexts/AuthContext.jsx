import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [inventoryID, setInventoryID] = useState(null); 
  const [userID, setUserID] = useState(null); 

  return (
    <AuthContext.Provider value={{ inventoryID, setInventoryID, userID, setUserID}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
