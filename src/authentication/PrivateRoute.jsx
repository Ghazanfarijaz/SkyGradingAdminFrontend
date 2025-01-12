import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider"; // Assuming you have an auth context

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Use the auth context

  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};


export default PrivateRoute;
