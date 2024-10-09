import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import "./AddImages.css";
import Navbar from "../Navbar/Navbar";
import { motion } from "framer-motion";

const AddImages = () => {
  const { auth } = useContext(AuthContext);
  const { userId } = auth;
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [apiStatus, setApiStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      setErrorMessage("Please enter an image URL.");
      return;
    }

    try {
      setApiStatus("Loading");

      const url = "http://localhost:4000/add/image";

      const response = await axios.put(url, {
        userId,
        title,
        image: imageUrl,
        description,
      });

      console.log("Response:", response.data);
      setApiStatus("Success");

      setTitle("");
      setImageUrl("");
      setDescription("");
    } catch (error) {
      console.error("Error uploading the image:", error);
      setApiStatus("Failure");
      const message = error.response?.data?.message || "An error occurred.";
      setErrorMessage(message);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="add-image-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://i.pinimg.com/564x/64/cb/14/64cb1456df85e5cd98978c67940c5aea.jpg"
          alt=""
          className="add-image-image"
        />
        <p className="add-image">Add Image</p>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              type="url"
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>

        {apiStatus === "Loading" && <p>Loading...</p>}
        {apiStatus === "Success" && (
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            Image URL added successfully!
          </motion.p>
        )}
        {apiStatus === "Failure" && (
          <motion.p
            className="error-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.p>
        )}

        <a
          href="https://postimages.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="postimages-button"
        >
          Convert your image into a URL
        </a>

        <p className="note">
          Note: After uploading your image on the PostImages website, please
          copy the direct link that ends with .png or .jpg (second link). Then,
          paste this link into the Image URL section.
        </p>
      </motion.div>
    </>
  );
};

export default AddImages;
