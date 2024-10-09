import React, { useContext, useState } from "react";
import "./Navbar.css";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../../AuthContext/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    logout(); // Log out the user
    setShowModal(false); // Close the modal after logging out
  };

  const handleCancelLogout = () => {
    setShowModal(false); // Close the modal without logging out
  };

  return (
    <>
      <nav className="home-navbar">
        <div className="logo-container">
          <motion.img
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
            src="https://i.postimg.cc/g2y00HWt/snapedit-1727436568723-removebg-preview.png"
            className="navbar-image"
            alt="Memoir Logo"
          />
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.4, duration: 0.6 },
            }}
            className="app-name"
          >
            Memoir
          </motion.h1>

          <div className="nav-button-container">
            <motion.button
              initial={{ opacity: 0, y: -50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.4, duration: 1 },
              }}
              onClick={handleLogoutClick}
              className="logout-btn"
            >
              <AiOutlineLogout />
            </motion.button>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-buttons">
              <button onClick={handleConfirmLogout} className="confirm-btn">
                Yes
              </button>
              <button onClick={handleCancelLogout} className="cancel-btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
