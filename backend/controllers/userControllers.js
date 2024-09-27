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
      images,
    });

    const user = await newUser.save();

    // Create token
    const token = createToken(user._id);

    return res.status(201).json({ success: true, token });
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
      message: "Login successful",
      token,
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
