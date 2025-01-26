const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const registerUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await user.save();

    // Generate a verification token
    const verificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send verification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

 const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<h2>Welcome, ${name}!</h2>
             <p>Please verify your email by clicking the link below:</p>
             <a href="https://job-posting-board-with-email-automation.onrender.com/api/auth/verify/${verificationToken}">Verify Email</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "User registered! Check your email to verify your account." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const verifyEmail = async (req, res) => {
    const { token } = req.params;
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find the user by ID
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if already verified
      if (user.isVerified) {
        return res.status(400).json({ message: "User is already verified" });
      }
  
      // Mark the user as verified
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: "Email verified successfully" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Invalid or expired token" });
    }
  };

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the user is verified
      if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify your email before logging in" });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      // Set the token in an HTTP-only cookie
      res.cookie("token", token, { httpOnly: true, secure: false }); // Use `secure: true` in production
      res.status(200).json({ message: "Login successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const logoutUser = (req, res) => {
    try {
      // Clear the token from the HTTP-only cookie
      res.clearCookie("token", { httpOnly: true, secure: false }); // Use `secure: true` in production
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  module.exports = { registerUser, verifyEmail, loginUser, logoutUser };
  
