const express = require("express");
const router = express.Router();
const {
  getIssues,
  getIssue,
  createIssue,
  deleteIssue,
  updateIssue,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");

//Re-route into note router
const noteRouter = require("./noteRoutes.js");
router.use("/:issueId/notes", noteRouter);

router.route("/").get(protect, getIssues).post(protect, createIssue);

router
  .route("/:id")
  .get(protect, getIssue)
  .delete(protect, deleteIssue)
  .put(protect, updateIssue);

//export router
module.exports = router;
