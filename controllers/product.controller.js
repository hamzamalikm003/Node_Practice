const Product = require("../models/product.model");
const Category = require("../models/category.model");
const loadash = require("lodash");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const { title, description, category, price, quantity } = req.body;
    const categoryCheck = await Category.findById(category);
    if (!categoryCheck) {
      return res.status(404).send({
        message: "Category not found with id " + category,
      });
    }
    let data = [];
    if (!req.files) {
      res.send({
        message: "No file uploaded",
      });
    } else {
      const photos=[req.files.images]
      //loop all files
      loadash.forEach(loadash.keysIn(photos), (key) => {
        let photo = photos[key];
        let fileName = photo.name;
        //move photo to uploads directory
        photo.mv(`uploads/product/${fileName}`, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });

        //push file details
        data.push(fileName);
      });
    }

    //create Product
    const product = new Product({
      title,
      description,
      category,
      price,
      quantity,
      images: data,
    });
    await product.save();

    return res.status(201).send(product);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Product.",
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const _id = req.params.Id;
  try {
    let data = [];
    if (!req.files) {
      res.send({
        message: "No file uploaded",
      });
    } else {
      const photos=[req.files.images]
      //loop all files
      loadash.forEach(loadash.keysIn(photos), (key) => {
        let photo = photos[key];
        let fileName = photo.name;
        //move photo to uploads directory
        photo.mv(`uploads/product/${fileName}`, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
        });
        console.log(fileName);
        //push file details
        data.push(fileName);
      });
    }
    //Update Product
    const product = await Product.findByIdAndUpdate(
      _id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        images: data,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.Id,
      });
    }
    res.send(product);
  } catch (error) {
    return res.status(500).send({
      message: "Error updating product with id " + req.params.Id,
    });
  }
};

//Find Specific Product by ID
exports.findProduct = async (req, res) => {
  const _id = req.params.Id;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.Id,
      });
    }
    res.send(product);
  } catch (error) {
    return res.status(500).send({
      message: "Error in finding product with id " + req.params.Id,
    });
  }
};

// Find all the Products
exports.findAll = async (req, res) => {
  try {
    const product = await Product.find();

    res.send(product);
  } catch (error) {
    return res.status(500).send({
      message: "Error in retriving the result",
    });
  }
};

//Delete the Product
exports.deleteProduct = async (req, res) => {
  const _id = req.params.Id;
  try {
    const product = await Product.findByIdAndDelete(_id);
    if (!product) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.Id,
      });
    }
    res.send(product);
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting product with id " + req.params.Id,
    });
  }
};
