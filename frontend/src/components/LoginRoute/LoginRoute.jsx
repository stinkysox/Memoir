import React, { useContext, useState } from "react";
import "./LoginRoute.css";
import { motion } from "framer-motion";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { AuthContext } from "../../AuthContext/AuthContext";
import Navbar from "../Navbar/Navbar";

const LoginRoute = () => {
  const { auth, login } = useContext(AuthContext);
  const [isLoginClicked, setIsLoginClicked] = useState(true);
  const [apiStatus, setApiStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiStatus("Loading");
    setErrorMessage("");
    const url = isLoginClicked
      ? "http://localhost:4000/login"
      : "http://localhost:4000/createuser";

    try {
      const response = await axios.post(url, formData);
      const { name, images, token, userId } = response.data;
      console.log(response.data);

      if (token) {
        setApiStatus("Success");
        login(token, userId, name, images);
        navigate("/");
      }
    } catch (error) {
      setApiStatus("Failure");
      const message = error.response?.data?.message || "An error occurred.";
      setErrorMessage(message);
      console.error("Error submitting the form:", error);
    }
  };

  const toggleForm = () => {
    setIsLoginClicked((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
    setErrorMessage("");
  };

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots type="ThreeDots" color="white" height="50" width="50" />
    </div>
  );

  const renderFormView = () => (
    <form className="login-form-container" onSubmit={handleSubmit}>
      <div className="login-image-container">
        <motion.img
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src="https://i.pinimg.com/564x/34/5f/5e/345f5ea88e6799a06422403518702135.jpg"
          className="login-logo-image"
          alt="Memoir Logo"
        />
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="login-app-name"
        >
          Memoir
        </motion.h1>
      </div>

      <div className={isLoginClicked ? "login-container" : "sign-up-container"}>
        {!isLoginClicked && (
          <div>
            <label className="login-label" htmlFor="input-name">
              Username
            </label>
            <br />
            <input
              className="login-input-field"
              type="text"
              id="input-name"
              placeholder="Enter your Username"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div>
          <label className="login-label" htmlFor="email">
            Email
          </label>
          <br />
          <input
            className="login-input-field"
            type="text"
            id="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="login-label" htmlFor="password">
            Password
          </label>
          <br />
          <input
            className="login-input-field"
            type="password"
            id="password"
            placeholder={
              isLoginClicked ? "Enter your Password" : "Create Password"
            }
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="login-submit-button">
          {isLoginClicked ? "Login" : "Sign Up"}
        </button>
        {apiStatus === "Failure" && (
          <p className="login-error-message">{errorMessage}</p>
        )}

        <div className="login-bottom-container">
          <p>
            {isLoginClicked
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <span className="login-toggle-form-link" onClick={toggleForm}>
            {isLoginClicked ? "Create User" : "Login"}
          </span>
        </div>
      </div>
    </form>
  );

  const renderBasedOnApiStatus = () => {
    switch (apiStatus) {
      case "Loading":
        return renderLoadingView();
      case "Success":
        return <div>Success! Redirecting...</div>;
      default:
        return renderFormView();
    }
  };

  return <div className="login-main-container">{renderBasedOnApiStatus()}</div>;
};

export default LoginRoute;
