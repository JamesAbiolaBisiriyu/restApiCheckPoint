const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config", ".env") }); // Load environment variables from config/.env
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User"); // Import the User model

const app = express();
app.use(express.json()); // Parse incoming JSON request bodies

// Connect to MongoDB using the URI defined in config/.env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ message: "Failed to fetch users." });
  }
});

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: "Failed to create user.", error });
  }
});

// Update a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    // Prevent duplicate emails when updating a user
    if (req.body.email) {
      const existingUser = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.params.id },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "Email already exists for another user.",
        });
      }
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on the update
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    // Handle duplicate key errors from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
        field: Object.keys(error.keyPattern)[0],
      });
    }
    res.status(400).json({ message: "Failed to update user.", error });
  }
});

// Delete a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user.", error });
  }
});

// Start the Express server so the routes are available in Postman
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
