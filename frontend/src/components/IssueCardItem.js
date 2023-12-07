import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

function IssueCardItem({ issue }) {
  //  date options argument
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return (
    <div className="issue__card">
      <div className="card__title">
        {/* <div className="issue__card-title-container"> */}
        <div className="issue-headings">
          <h3 className="issue__card-title">Report date</h3>
          <h3 className="issue__card-title">Issue</h3>
          <h3 className="issue__card-title">Status</h3>
          <h3 className="issue__card-title">Priority</h3>
        </div>

        {/* <div></div> */}
      </div>
      {/* <div className="issue__card-data-container"> */}
      <div className="issue">
        <span className="issue__card-data">
          {new Date(issue.createdAt).toLocaleString('en-US', options)}
        </span>
        <span className="issue__card-data">{issue.issueType}</span>
        {/* <div>{new Date(issue.createdAt).toLocaleString("en-US", options)}</div> */}
        {/* <div>{issue.issueType}</div> */}
        {/* <span className="issue__card-data">{issue.status}</span> */}
        <span className={`status status-${issue.status}`}>
          {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
        </span>
        <span className={`priority priority-${issue.priority}`}>
          {issue.priority}
        </span>

        {/* <div className={`status status-${issue.status}`}>{issue.status}</div> */}
      </div>
      <Link className="issue__button" to={`/issue/${issue._id}`}>
        View <FaArrowRight className="issue__button-icon" />
      </Link>
    </div>
  );
}

export default IssueCardItem;
