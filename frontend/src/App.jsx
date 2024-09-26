import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRoute from "./components/LoginRoute/LoginRoute";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
