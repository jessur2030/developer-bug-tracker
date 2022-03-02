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
      enum: ["Task", "Bug", "Request", "Other"],
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
      require: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
    priority: {
      type: String,
      required: true,
      enum: ["High", "Normal", "Low"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
