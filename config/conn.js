const mongoose = require("mongoose");

// Connect to the Database
const DB = process.env.db;

mongoose
  .connect(DB)
  .then((res) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not Connected", err);
  });
