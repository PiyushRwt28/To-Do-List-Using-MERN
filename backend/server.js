require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect("mongodb://localhost:27017/testing");

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks",taskRoutes);

// Start server
app.listen(5000, () => {
  console.log("Server Started on port 5000");
});
