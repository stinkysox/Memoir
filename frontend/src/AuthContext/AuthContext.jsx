/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

    console.log("Token:", token);
    console.log("UserId:", userId);
    console.log("Name:", name);
    console.log("Images:", images);

    if (token && userId && name) {
      setAuth({
        token,
        isAuthenticated: true,
        userId,
      });

      let parsedImages = [];
      if (images) {
        try {
          parsedImages = JSON.parse(images);
        } catch (error) {
          console.error("Error parsing images from cookies:", error);
        }
      } else {
        console.warn("Images cookie is not set or is undefined.");
      }

      setUserDetails({
        name,
        images: Array.isArray(parsedImages) ? parsedImages : [], // Ensure images is an array
      });
    }
  }, []);

  const login = (token, userId, name, images) => {
    const expires = 54; // Set cookie expiration
    Cookies.set("token", token, { expires });
    Cookies.set("userId", userId, { expires });
    Cookies.set("name", name, { expires });
    Cookies.set("images", JSON.stringify(Array.isArray(images) ? images : []), {
      expires,
    }); // Ensure images is a valid array

    setAuth({
      token,
      isAuthenticated: true,
      userId,
    });
    setUserDetails({
      name,
      images: Array.isArray(images) ? images : [], // Ensure images is an array
    });
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId"); // Remove userId from cookies
    Cookies.remove("name");
    Cookies.remove("images");
    setAuth({
      token: null,
      isAuthenticated: false,
      userId: null, // Reset userId
    });
    setUserDetails({ name: "", images: [] });
  };

  return (
    <AuthContext.Provider value={{ auth, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
