const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Issue = require("../models/issueModel");

// @desc    Get user issues
// @route   GET /api/issues
// @access  Private
const getIssues = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const issues = await Issue.find({ user: req.user.id });

  res.status(200).json(issues);
});

// @desc    Get user issue
// @route   GET /api/issues/:id
// @access  Private
const getIssue = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get issue by id from the url
  const issue = await Issue.findById(req.params.id);

  //
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  //
  if (issue.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(issue);
});

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  //get product, description:  from the body
  const { issueType, title, description, priority } = req.body;

  //check for product & description
  if (!issueType || !description || !title || !priority) {
    res.status(400);
    throw new Error("Please add all required fields");
  }

  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const issue = await Issue.create({
    issueType,
    title,
    description,
    priority,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(issue);
});

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get issue by id from the url
  const issue = await Issue.findById(req.params.id);

  //
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  //
  if (issue.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await issue.remove();

  res.status(200).json({ success: true });
});

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = asyncHandler(async (req, res) => {
  //Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //get issue by id from the url
  const issue = await Issue.findById(req.params.id);

  //
  if (!issue) {
    res.status(404);
    throw new Error("Issue not found");
  }

  //
  if (issue.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedIssue);
});

module.exports = { getIssues, getIssue, createIssue, deleteIssue, updateIssue };
