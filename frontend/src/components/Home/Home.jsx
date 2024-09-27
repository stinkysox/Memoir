import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="home-main-container">
      <nav className="home-navbar">
        <div className="logo-container">
          <img
            src="https://i.postimg.cc/g2y00HWt/snapedit-1727436568723-removebg-preview.png"
            className="navbar-image"
            alt="Memoir Logo"
          />
          <h1 className="app-name">Memoir</h1>
          <div className="nav-button-container">
            <button className="logout-btn">Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
