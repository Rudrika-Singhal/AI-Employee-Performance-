const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// SIGNUP
const signup = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });

    res.status(201).json({

      success: true,

      message: "Signup Successful",

      user,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Signup Failed",
    });
  }
};


// LOGIN
const login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    res.json({

      success: true,

      message: "Login Successful",

      token,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login Failed",
    });
  }
};

module.exports = {
  signup,
  login,
};