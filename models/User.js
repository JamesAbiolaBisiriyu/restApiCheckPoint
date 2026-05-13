const mongoose = require("mongoose");

// Schema that defines how user documents are stored
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields automatically
  },
);

// Export the model for use in server.js
module.exports = mongoose.model("User", UserSchema);
