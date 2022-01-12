const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register a New User 
exports.register = async (req, res) => {
  try {

    const { name, email, password, phone } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(422).json({ error: "user already exists" });
      return;
    } else {
      //Register User
      const user = new User({ name, email, phone, password });

      //Hashing Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(201).json({ message: "User Register" });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        
        //Generate Token
        const payLoad = {
          user: {
            _id: user._id,
          },
        };

        jwt.sign(
          payLoad,
          "secretwebkey",
          {
            expiresIn: 10000,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({token, message: "Succesful" });
          }
        );
      } else {
        res.status(400).json({ message: "No user found" });
      }
    } else {
      res.status(400).json({ message: "No user found" });
    }
  } catch (err) {
    console.log("Error", err);
  }
};

exports.about = (req, res) => {
  try {
    res.status(200).json({ message: "hello about" });
  } catch (err) {
    console.log("Error", err);
  }
};
