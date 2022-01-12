const express = require("express");
const authRouter = express.Router();
const { register, login, about } = require("../controllers/auth.controller");
const Auth = require("../middleware/auth");

// Registration page Route
authRouter.post("/registration", register);

// Log In Page Route
authRouter.post("/login", login);

// About Page
authRouter.get("/about", Auth, about);

module.exports = authRouter;
