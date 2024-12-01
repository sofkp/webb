import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(async (credentials) => {
    try {
      const response = await fetch(
        "https://0w7xbgvz6f.execute-api.us-east-1.amazonaws.com/test/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      setIsAuthenticated(false);

    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, );

  const register = useCallback(async (credentials) => {
    try {
      const response = await fetch(
        "https://0w7xbgvz6f.execute-api.us-east-1.amazonaws.com/test/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      setIsAuthenticated(true);

    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }, );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  },);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
