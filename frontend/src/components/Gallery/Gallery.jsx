import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { motion } from "framer-motion";

const Gallery = () => {
  const [imagesArray, setImagesArray] = useState([]);

  const getAllPosts = async () => {
    const url = "https://memoirapi.onrender.com/all/images";
    try {
      const response = await axios.get(url);
      const data = response.data;
      const { images } = data;
      console.log(images);
      images.sort(
        (a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded)
      );

      console.log(images);

      setImagesArray(images);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  // Framer Motion variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between children animations
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="gallery-main-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="gallery-posts-container">
          {imagesArray.map((eachItem, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="gallery-card"
            >
              <img src={eachItem.imageUrl} alt={eachItem.title} />

              <div className="gallery-text-container">
                <h3>{eachItem.title}</h3>
                <p className="gallery-date"></p>

                <p className="posted-by">{`Posted by ${
                  eachItem.username
                } on  ${new Date(
                  eachItem.dateUploaded
                ).toLocaleDateString()}`}</p>
                <p className="gallery-description">{eachItem.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Gallery;
