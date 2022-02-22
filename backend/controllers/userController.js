const asyncHandler = require("express-async-handler");

// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  //destructured data from the body
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  res.send("Register user");
});

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send("Login user");
});

module.exports = { registerUser, loginUser };
