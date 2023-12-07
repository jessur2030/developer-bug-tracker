const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//protect route function middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //check for token in the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //
    try {
      //Get token from headers
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      //Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      // console.log(req.user);
      //call next
      next();
    } catch (error) {
      //
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
