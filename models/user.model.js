const mongoose = require("mongoose");
const validator = require("validator");

// Build User Schema for validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is incorrect");
      }
    },
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});


const User = mongoose.model("USER", userSchema);
module.exports = User;
