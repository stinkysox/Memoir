import React, { useState } from "react";
import "./LoginRoute.css";
import { motion } from "framer-motion";
const LoginRoute = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(true);

  return (
    <div className="login-main-container">
      <form className="form-container">
        <div className="image-container">
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="https://i.pinimg.com/564x/34/5f/5e/345f5ea88e6799a06422403518702135.jpg"
            className="logo-image"
            alt="Memoir Logo"
          />
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="app-name"
          >
            Memoir
          </motion.h1>
        </div>
        {isLoginClicked ? (
          <div className="login-container">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="input-field"
                type="text"
                id="email"
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="input-field"
                type="password"
                id="password"
                placeholder="Enter your Password"
              />
            </div>

            <button type="submit" className="submit-button">
              Login
            </button>

            <div className="login-bottom-container">
              <p>Dont have an account?</p>
              <span
                className="toggle-form-link"
                onClick={() => setIsLoginClicked(false)}
              >
                Create User
              </span>
            </div>
          </div>
        ) : (
          <div className="sign-up-container">
            <div>
              <label htmlFor="name" className="label">
                Name
              </label>
              <br />
              <input
                className="input-field"
                type="text"
                id="name"
                placeholder="Enter your Name"
              />
            </div>

            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="input-field"
                type="text"
                id="email"
                placeholder="Enter your Email"
              />
            </div>

            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="input-field"
                type="password"
                id="password"
                placeholder="Create Password"
              />
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            <div className="login-bottom-container">
              <p>Already have an account?</p>
              <span
                className="toggle-form-link"
                onClick={() => setIsLoginClicked(true)}
              >
                Login
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginRoute;
