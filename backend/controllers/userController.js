const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //destructured data from the body
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }
  //Find if user already exits
  const userExits = await User.findOne({ email });

  //if user exits
  if (userExits) {
    res.status(400);
    throw new Error("User already exits");
  }

  //salt password
  const salt = await bcrypt.genSalt(10);
  //hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //if user is create
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  //get user email & password from the body
  const { email, password } = req.body;

  //from User model: find user by email
  const user = await User.findOne({ email });
  //if user is found: compare the plain text password to hashed password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    //res status: 401 Unauthorized
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Gte current user
// @route   /api/users/lme
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = { id: req.user._id, name: req.user.name, email: req.user.email };
  res.status(200).json(user);
});

const generateToken = (id) => {
  //jwt sign
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    //token expires in 30 days
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getMe };
