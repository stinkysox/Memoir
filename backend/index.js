import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {
  addImages,
  createUser,
  deletePost,
  fetchAllImages,
  getUserDetails,
  verifyUser,
} from "./controllers/userControllers.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:ismCUtOVF42yT6NE@apipractice.ox6uu.mongodb.net/Node-API?retryWrites=true&w=majority&appName=ApiPractice"
    );
    console.log("Connected to database!");
  } catch (error) {
    console.log("Failed to connect:", error.message);
  }
};

connectDB();

// Routes
app.post("/createuser", createUser);
app.post("/login", verifyUser);
app.put("/add/image", addImages);
app.post("/user/data", getUserDetails);
app.delete("/delete/image/:userId/:imageId", deletePost);
app.get("/all/images", fetchAllImages);

// Welcome route
app.get("/", (req, res) => {
  console.log("Welcome Browser");
  res.send("Welcome Browser");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
