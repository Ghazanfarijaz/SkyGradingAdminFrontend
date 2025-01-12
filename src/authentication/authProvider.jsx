import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userDetails, authToken) => {
    setIsAuthenticated(true);
    setUser(userDetails);

    // Save user details and token in localStorage
    localStorage.setItem("currentUser", JSON.stringify(userDetails));
    localStorage.setItem("authToken", authToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    // Remove user details and token from localStorage
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    // Retrieve user details and token from localStorage on app load
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
