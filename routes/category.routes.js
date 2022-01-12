const express = require("express");
const categoryRouter = express.Router();
const Auth = require("../middleware/auth");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  findCategory,
  findAll,
} = require("../controllers/category.controller");


// Create a New Category
categoryRouter.post("/createCategory", createCategory);

//Show All Categories
categoryRouter.get("/findAllCategories", findAll);

//Update Specific Category
categoryRouter.put("/updateCategory/:Id", updateCategory);

//Find Specific Category
categoryRouter.post("/findCategory/:Id", findCategory);

//Delete Specific Category
categoryRouter.delete("/deleteCategory/:Id", deleteCategory);

module.exports = categoryRouter;
