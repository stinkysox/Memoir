import User from "../models/userModel.js"; // Adjust the path as necessary
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken";
import validator from "validator";

const createToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const createUser = async (req, res) => {
  const { name, email, password, images } = req.body;

  try {
    // Check if the user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Validate email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a strong password" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      images,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    // Send success response with token
    return res.status(201).json({ success: true, token });
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error in createUser:", error.message);

    // Send a more detailed error response
    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message, // Include this for easier debugging
    });
  }
};
