const mongoose = require("mongoose");

//create noteSchema
const noteSchema = mongoose.Schema(
  {
    //user relation with issue
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    //Allows us to know which issue, notes are related to.
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Issue",
    },

    text: {
      type: String,
      required: [true, "Please write a note"],
    },
    // isTeamMember: for a future team portal feature
    isTeamMember: {
      type: Boolean,
      default: false,
    },
    teamMemberId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
