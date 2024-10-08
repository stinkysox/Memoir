import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
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
    const [emailExists, userNameExists] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ name }),
    ]);
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    if (userNameExists) {
      return res
        .status(400)
        .json({ success: false, message: `Username ${name} is already taken` });
    }

    // Validate email format and strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "The password must be atleast 8 characters long",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      images: images || [],
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    return res
      .status(201)
      .json({ success: true, token, images, name, userId: user._id });
  } catch (error) {
    console.error("Error in createUser:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
      images: user.images,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error in verifyUser:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

export const addImages = async (req, res) => {
  const { title, description, image: imageUrl, userId } = req.body;
  console.log(title);

  try {
    // Find the user and update their images array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: { images: { title, description, imageUrl } }, // Store image details
      },
      { new: true, useFindAndModify: false } // This option returns the updated document
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, images: updatedUser.images });
  } catch (error) {
    console.error("Error in addImages:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error occurred",
      error: error.message,
    });
  }
};

export const getUserDetails = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      images: user.images,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const deletePost = async (req, res) => {
  const { userId, imageId } = req.params;
  console.log(`user ${userId} image ${imageId}`);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { images: { _id: imageId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Image deleted successfully", updatedUser });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
