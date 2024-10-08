import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoute from "./components/LoginRoute/LoginRoute";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./components/Home/Home";
import AddImages from "./components/AddImagesRoute/AddImages";

function App() {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
