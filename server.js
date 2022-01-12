const express = require("express");
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
require("dotenv").config();


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));


app.use(fileUpload({
    createParentPath: true
}));

app.use(express.static('uploads'));

// connect to the db
require("./config/conn");

// define User model
const User = require("./models/user.model");

// //define Category model
// const Category = require("./models/category.model");

const Port = process.env.port;

// to get the json data
app.use(express.json());


// defines routes

app.use(require("./routes/auth.routes"));
app.use(require("./routes/category.routes"));
app.use(require("./routes/product.routes"));


app.listen(Port, () => console.log(`Starting at ${Port}`));
