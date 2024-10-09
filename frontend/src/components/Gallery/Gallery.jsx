import React, { useContext, useEffect, useState } from "react";
import "./Gallery.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const Gallery = () => {
  const [imagesArray, setImagesArray] = useState([]);

  const getAllPosts = async () => {
    const url = "http://localhost:4000/all/images";
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

  return (
    <>
      <Navbar />
      <div className="gallery-main-container">
        <div className="gallery-posts-container">
          {imagesArray.map((eachItem, index) => (
            <div key={index}>
              <img src={eachItem.imageUrl} alt={eachItem.title} />

              <div className="gallery-text-container">
                <h3>{eachItem.title}</h3>
                <p className="gallery-date">
                  {new Date(eachItem.dateUploaded).toLocaleDateString()}
                </p>

                <p className="posted-by">{`Posted by ${eachItem.username}`}</p>
                <p className="gallery-description">{eachItem.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
