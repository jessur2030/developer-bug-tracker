const mongoose = require("mongoose");

//create issueSchema
const issueSchema = mongoose.Schema(
  {
    //user relation with issue
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    issueType: {
      type: String,
      required: [true, "Please add an issue type"],
      enum: ["task", "bug", "request", "other"],
    },
    title: {
      type: String,
      required: [true, "Please enter a title of the issue"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
    priority: {
      type: String,
      required: true,
      enum: ["high", "normal", "low"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
