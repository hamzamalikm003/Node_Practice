const express = require("express");
const productRouter = express.Router();
const Auth = require("../middleware/auth");
const {createProduct,updateProduct,deleteProduct,findProduct,findAll}=require('../controllers/product.controller');

// Create a New Product
productRouter.post("/createProduct",createProduct);

//Show All Products
productRouter.get("/findAllProduct",findAll);

//Update Specific Product
productRouter.put("/updateProduct/:Id",updateProduct);

//Find Specific Product
productRouter.post("/findProduct/:Id",findProduct);

//Delete Specific Product
productRouter.delete("/deleteProduct/:Id",deleteProduct);

module.exports = productRouter;