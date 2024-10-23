import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginRoute from "./components/LoginRoute/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import AddImages from "./components/AddImagesRoute/AddImages";
import Gallery from "./components/Gallery/Gallery";
import ForgotPassword from "./ForgotPassword/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-image"
        element={
          <ProtectedRoute>
            <AddImages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
