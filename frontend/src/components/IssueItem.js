import React from "react";
import { Link } from "react-router-dom";

function IssueItem({ issue }) {
  //  date options argument
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="issue">
      <div>{new Date(issue.createdAt).toLocaleString("en-US", options)}</div>
      <div>{issue.issueType}</div>
      <div className={`status status-${issue.status}`}>{issue.status}</div>
      <Link className="btn btn-reverse btn-sm" to={`/issue/${issue._id}`}>
        View
      </Link>
    </div>
  );
}

export default IssueItem;
