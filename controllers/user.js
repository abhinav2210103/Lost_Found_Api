const User = require("../models/users");
const bcrypt = require("bcryptjs");
const { createTokenForUser } = require("../services/authentication");

exports.handleUserSignUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists!" });

    const newUser = new User({ fullName, email, password }); 
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Sign Up Error:", error);
    res.status(500).json({ error: "Error signing up user" });
  }
};


exports.handleUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt for:", email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found!");
      return res.status(400).json({ message: "Invalid credentials! No user found" });
    }

    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch = await user.matchPassword(password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match!");
      return res.status(400).json({ message: "Invalid credentials! Wrong password" });
    }

    const token = createTokenForUser(user);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Sign In Error:", error);
    res.status(500).json({ error: "Error signing in user" });
  }
};


