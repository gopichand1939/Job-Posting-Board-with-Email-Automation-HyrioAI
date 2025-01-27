require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const authenticateUser = require("./middleware/authMiddleware");
const jobRoutes = require("./routes/job");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://job-posting-board-with-email-automation-frontend-hyrio-ai.vercel.app", // Frontend URL
    credentials: true, // Allow cookies and credentials
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", authenticateUser, jobRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Job Posting Board API!");
});

// Health Check Route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running smoothly" });
});

// Start the Server
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

