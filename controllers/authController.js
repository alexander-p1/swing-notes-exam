import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// Register a new user
export const register = async (req, res) => {
  const { username, password } = req.body;
  console.log("Body", req.body);

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Check if user already exists
  userModel.findByUsername(username, async (err, user) => {
    if (user) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    console.log("saving user to db", username, hashedPassword);
    userModel.createUser(
      { username, password: hashedPassword },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ message: "Error registering user." });
        }
        res.status(201).json({ message: "User registered successfully." });
      }
    );
  });
};

// Login a user
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Find the user
  userModel.findByUsername(username, async (err, user) => {
    if (!user) {
      return res.status(400).json({ message: "Invalid username." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  });
};
