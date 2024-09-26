import React, { useState } from "react";
import "./LoginRoute.css";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";

const LoginRoute = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [apiStatus, setApiStatus] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    console.log(formData);
    const url = isLoginClicked
      ? "http://localhost:4000/login"
      : "http://localhost:4000/createuser";

    try {
      const response = await axios.post(url, formData);
      console.log(response.data);
      const { token } = response.data;

      if (token) {
        Cookies.set("token", token);
        setApiStatus("Success");
        navigate("/");
      }
    } catch (error) {
      setApiStatus("Failure");
      console.error("Error submitting the form:", error);
    }
  };

  const toggleForm = () => {
    setIsLoginClicked((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
  };

  const renderLoadingView = () => (
    <div className="loader-container">
      <ThreeDots type="ThreeDots" color="white" height="50" width="50" />
    </div>
  );

  const renderFormView = () => (
    <form className="form-container" onSubmit={handleSubmit}>
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

      <div className={isLoginClicked ? "login-container" : "sign-up-container"}>
        {!isLoginClicked && (
          <div>
            <label className="label" htmlFor="name">
              Name
            </label>
            <br />
            <input
              className="input-field"
              type="text"
              id="name"
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
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
            value={formData.email}
            onChange={handleInputChange}
            required
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
            placeholder={
              isLoginClicked ? "Enter your Password" : "Create Password"
            }
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          {isLoginClicked ? "Login" : "Sign Up"}
        </button>

        <div className="login-bottom-container">
          <p>
            {isLoginClicked
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>
          <span className="toggle-form-link" onClick={toggleForm}>
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
      case "Failure":
        return <div>Error submitting the form. Please try again.</div>;
      default:
        return renderFormView();
    }
  };

  return <div className="login-main-container">{renderBasedOnApiStatus()}</div>;
};

export default LoginRoute;
