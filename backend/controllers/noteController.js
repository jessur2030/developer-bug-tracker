const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Issue = require("../models/issueModel");

// @desc    Get issue notes
// @route   GET /api/issues/:issueId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //Get user using th eid in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //if user is found:
  const issue = await Issue.findById(req.params.issueId);
  if (issue.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //get notes
  const notes = await Note.find({ issue: req.params.issueId });

  res.status(200).json(notes);
});

// @desc    Create issue note
// @route   POST /api/issues/:issueId/notes
// @access  Private
const addNote = asyncHandler(async (req, res) => {
  //Get user using th eid in the JWT
  const user = await User.findById(req.user.id);

  //check for the user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //if user is found:
  const issue = await Issue.findById(req.params.issueId);
  if (issue.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //create note
  const note = await Note.create({
    text: req.body.text,
    isTeamMember: false,
    issue: req.params.issueId,
    user: req.user.id,
  });

  //return note
  res.status(200).json(note);
});

// @desc    Update issue note
// @route   PUT /api/issues/:issueId/notes
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  //update an issue note...
});

// @desc    Delete issue note
// @route   DELETE /api/issues/:issueId/notes
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  //delete an issue note...
});

module.exports = {
  getNotes,
  addNote,
};
