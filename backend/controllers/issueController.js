const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Issue = require("../models/issueModel");

// @desc    Get user issues
// @route   GET /api/issues
// @access  Private
const getIssues = asyncHandler(async (req, res) => {
  //
  res.status(200).json({ message: "get issues" });
});

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  //
  res.status(200).json({ message: "create issue" });
});

module.exports = { getIssues, createIssue };
