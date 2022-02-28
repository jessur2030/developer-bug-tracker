const express = require("express");
const router = express.Router();
const { getIssues, createIssue } = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getIssues).post(protect, createIssue);

module.exports = router;
