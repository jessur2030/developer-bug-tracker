const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/noteController");

//note route
// /api/issues/:issueId/notes
router.route("/").get(protect, getNotes).post(protect, addNote);

module.exports = router;
