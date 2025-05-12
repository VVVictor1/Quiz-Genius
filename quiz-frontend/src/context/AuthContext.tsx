import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
const AuthContext = createContext({} as any);

// Custom hook for easy access to the AuthContext
export const useAuth = () => useContext(AuthContext);

const isTokenExpired = (token: string) => {
  if(!token){
    return true;
  }

  try{
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return (decodedToken.exp ?? 0) < currentTime;
  }catch(error){
    return true;
  }
}
 

// AuthProvider component that provides the authentication state and functions
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize isAuthenticated based on whether a token exists in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Function to log in: saves token and sets isAuthenticated to true
  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  // Function to log out: removes token and sets isAuthenticated to false
  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  useEffect( () =>{
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)){
      logout();
    }
   }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// RedirectIfAuthenticated component: if user is authenticated, allow access; otherwise, redirect to /login
export const RedirectIfNOTAuthenticated = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  // If  authenticated, navigate to login page.
  return isAuthenticated ? <Navigate to="/getting-started" /> : <>{children}</> ;
};


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

    


