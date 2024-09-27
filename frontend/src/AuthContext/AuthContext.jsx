import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuth({
        token,
        isAuthenticated: true,
      });
    }
  }, []);

  const login = (token) => {
    const expires = 54;
    Cookies.set("token", token, { expires });
    setAuth({
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    Cookies.remove("token");
    setAuth({
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
