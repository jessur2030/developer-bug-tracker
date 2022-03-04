import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getIssue, closeIssue, reset } from "../features/issues/issueSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader/Loader";
import { Button } from "bootstrap";

function Issue() {
  const { issue, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.issues
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: issueId } = useParams();

  useEffect(() => {}, []);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    dispatch(getIssue(issueId));
    // eslint-disable-next-line
  }, [isError, isError, issueId]);

  //on issue close
  const onIssueClose = () => {
    //
    dispatch(closeIssue(issueId));
    toast.success("Issue fixed 👍🐱‍👤");
    navigate("/issues");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    ////
    return <h3>Look's Like Something Went Wrong!</h3>;
  }
  return (
    <div className="issue-page">
      <header className="issue-header">
        <BackButton url="/issues" />
        {/* <h2>Issue Id: {issue._id}</h2> */}
        <span className={`status status-${issue.status}`}>{issue.status}</span>
        <h3>
          Priority:{" "}
          <span className={`priority priority-${issue.priority}`}>
            {issue.priority}{" "}
          </span>{" "}
        </h3>
        <h3>
          Report Date: {new Date(issue.createdAt).toLocaleString("en-US")}{" "}
        </h3>
        <h2>{issue.issueType}</h2>
        <h3>{issue.title}</h3>
        <hr />
        <div className="issue-desc">
          <h3>Bug Description</h3>
          <p>{issue.description}</p>
        </div>
      </header>

      {issue.status !== "fixed" && (
        <button onClick={onIssueClose} className="btn btn-block btn-danger">
          Fixed
        </button>
      )}
    </div>
  );
}

export default Issue;
