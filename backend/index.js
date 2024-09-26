import express from "express";
import mongoose from "mongoose";
import { createUser } from "./controllers/userControllers.js"; // Correct import syntax
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

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

app.post("/createuser", createUser);
