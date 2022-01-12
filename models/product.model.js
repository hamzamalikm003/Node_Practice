const mongoose = require("mongoose");

// Build Prduct Schema for validation
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  images:{
    type:[],
    required:true
  }
});

const Product = mongoose.model("PRODUCT", productSchema);
module.exports = Product;
