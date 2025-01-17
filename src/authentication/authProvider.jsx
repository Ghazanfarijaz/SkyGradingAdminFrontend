
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userDetails) => {
    setIsAuthenticated(true);
    setUser(userDetails);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);






// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = (userDetails, authToken) => {
//     try {
//       setIsAuthenticated(true);
//       setUser(userDetails);

//       // Save user details and token in localStorage
//       localStorage.setItem("currentUser", JSON.stringify(userDetails));
//       localStorage.setItem("authToken", authToken);
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   const logout = () => {
//     try {
//       setIsAuthenticated(false);
//       setUser(null);

//       // Remove user details and token from localStorage
//       localStorage.removeItem("currentUser");
//       localStorage.removeItem("authToken");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   useEffect(() => {
//     const initializeAuth = () => {
//       try {
//         // Retrieve user details and token from localStorage on app load
//         const storedUser = localStorage.getItem("currentUser");
//         const storedToken = localStorage.getItem("authToken");

//         if (storedUser && storedToken) {
//           // Optional: Add token expiry check here if your backend provides an expiry time
//           setUser(JSON.parse(storedUser));
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error("Error initializing auth:", error);
//       }
//     };

//     initializeAuth();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);