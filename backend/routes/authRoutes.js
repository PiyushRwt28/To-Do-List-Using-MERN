const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {

    const { name, password, email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, password: hashedPassword, email });

    res.send({ message: "Signup Successful" });
  } 

  catch (err) {
    console.error(err);
    res.send({ message: "Error while signing up" });
  }

});

// Login route
router.post("/login", async (req, res) => {

  try {

    const { name, password } = req.body;
    const user = await User.findOne({ name });

    if (!user) {
      return res.send({ message: "Invalid Credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {

      const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_SECRET);

      res.send({ message: "Login Successful", token });

    } 
    
    else {
      res.send({ message: "Invalid Credential" });
    }

  } 
  
  catch (error) {
    console.error(error);
    res.send({ message: "Server Error" });
  }

});

module.exports = router;
