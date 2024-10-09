/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [auth, setAuth] = useState({
    token: null,
    isAuthenticated: false,
    userId: null,
  });
  const [userDetails, setUserDetails] = useState({
    name: "",
    images: [],
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    const name = Cookies.get("name");
    const images = Cookies.get("images");

    // Check if token exists to set authentication state
    if (token) {
      setAuth({
        token,
        isAuthenticated: true,
        userId,
      });

      try {
        const parsedImages = images ? JSON.parse(images) : [];
        setUserDetails({
          name: name || "",
          images: Array.isArray(parsedImages) ? parsedImages : [],
        });
      } catch (error) {
        console.error("Error parsing images from cookies:", error);
      }
    } else {
      // If no token, ensure the auth state is reset
      setAuth({
        token: null,
        isAuthenticated: false,
        userId: null,
      });
      setUserDetails({ name: "", images: [] });
    }
  }, []);

  const login = (token, userId, name, images) => {
    const expires = 54; // Set cookie expiration
    Cookies.set("token", token, { expires });
    Cookies.set("userId", userId, { expires });
    Cookies.set("name", name, { expires });
    Cookies.set("images", JSON.stringify(Array.isArray(images) ? images : []), {
      expires,
    });

    setAuth({ token, isAuthenticated: true, userId });
    setUserDetails({
      name,
      images: Array.isArray(images) ? images : [],
    });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("name");
    Cookies.remove("images");

    setAuth({ token: null, isAuthenticated: false, userId: null });
    setUserDetails({ name: "", images: [] });

    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <AuthContext.Provider value={{ auth, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
