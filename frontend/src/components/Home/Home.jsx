import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext/AuthContext";
import { motion } from "framer-motion";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const { userId } = auth;
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImages, setUserImages] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "https://memoirapi.onrender.com/user/data",
          {
            userId,
          }
        );
        console.log(response.data);
        const { name, images } = response.data;

        setUserName(name);
        setUserImages(images);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const onDeletePost = async (id) => {
    console.log(id);
    console.log(userId);
    try {
      await axios.delete(
        `https://memoirapi.onrender.com/delete/image/${userId}/${id}`
      );
      setUserImages(userImages.filter((image) => image._id !== id));
    } catch (error) {
      console.error("Error deleting the image:", error);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="home-main-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="home-first-container">
          <p className="greeting">{`Hello ${userName} !`}</p>
          {Array.isArray(userImages) && userImages.length === 0 ? (
            <p className="no-images-message">
              You have not posted any images yet.
            </p>
          ) : (
            <div className="images-display">
              <p className="para-two">Showing images from your collection:</p>
              <div className="image-gallery">
                {userImages.map((image, index) => (
                  <div key={index} className="image-card">
                    <img
                      src={image.imageUrl}
                      alt={`User upload ${index}`}
                      className="user-image"
                    />
                    <h3 className="image-title">{image.title}</h3>
                    <p className="image-description">{image.description}</p>
                    <button
                      className="delete-card"
                      onClick={() => onDeletePost(image._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="add-div">
          <button
            className="add-images-button"
            onClick={() => navigate("/add-image")}
          >
            Add Images
          </button>
        </div>

        <div className="home-second-container">
          <p>
            To look at the photos posted by other users, click on the button
            below.
          </p>
          <button
            className="gallery-button"
            onClick={() => navigate("/gallery")}
          >
            Memory Lane
          </button>

          <a className="learn-more-button" onClick={toggleModal}>
            Learn more
          </a>
        </div>
      </motion.div>

      {showModal && (
        <div className="about-modal-overlay" onClick={toggleModal}>
          <div
            className="about-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="about-modal-close-button" onClick={toggleModal}>
              &times;
            </span>
            <p>
              <span className="para-style">{`Memoir `}</span> is a photo sharing
              platform where users can post pictures. <br /> Unlike other social
              media platforms that can be distracting, Memoir offers a
              distraction-free environment. <br /> <br /> The primary purpose of
              this app is to allow users to view images shared by others,
              serving as a timestamp of their experiences. You can post any
              photo here, whether it’s a picture of your beloved pet cat, a
              stunning sunset, or a beautiful canvas you’ve created. <br />{" "}
              <br />
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
