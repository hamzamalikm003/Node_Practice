const mongoose = require("mongoose");

// Build Catogory Schema for validation
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const Category = mongoose.model("CATEGORY", categorySchema);
module.exports = Category;
