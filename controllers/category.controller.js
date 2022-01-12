const Category = require("../models/category.model");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { title, detail } = req.body;
    let image;
    let fileName;
    if (!req.files) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    image = req.files.image;
    fileName = image.name;

    image.mv(`uploads/category/${fileName}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    //create category
    const category = new Category({ title, detail, image: fileName });
    await category.save();

    return res.status(201).send(category);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Category.",
    });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  const _id = req.params.Id;
  try {
    let image;
    let fileName;
    if (!req.files) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    image = req.files.image;
    fileName = image.name;

    image.mv(`uploads/category/${fileName}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    const category = await Category.findByIdAndUpdate(
      _id,
      {
        title: req.body.title,
        detail: req.body.detail,
        image:fileName
      },
      { new: true }
    );
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.Id,
      });
    }
    res.send(category);
  } catch (error) {
    return res.status(500).send({
      message: "Error updating category with id " + req.params.Id,
    });
  }
};

//Find Specific Category by ID
exports.findCategory = async (req, res) => {
  const _id = req.params.Id;
  try {
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.Id,
      });
    }
    res.send(category);
  } catch (error) {
    return res.status(500).send({
      message: "Error in finding category with id " + req.params.Id,
    });
  }
};

// Find all the Categories
exports.findAll = async (req, res) => {
  try {
    const category = await Category.find();

    res.send(category);
  } catch (error) {
    return res.status(500).send({
      message: "Error in retriving the result",
    });
  }
};

//Delete the Category
exports.deleteCategory = async (req, res) => {
  const _id = req.params.Id;
  try {
    const category = await Category.findByIdAndRemove(_id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.Id,
      });
    }
    res.send(category);
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting category with id " + req.params.Id,
    });
  }
};
