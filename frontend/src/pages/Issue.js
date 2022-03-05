import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getIssue, closeIssue, reset } from "../features/issues/issueSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader/Loader";
// import { capFirstLetter } from "../utils/utils";

function Issue() {
  const { issue, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.issues
  );

  console.log(issue.status);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: issueId } = useParams();

  //  date options argument
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <BackButton url="/issues" />
          <span className={`status status-${issue.status}`}>
            {/* {capFirstLetter(issue.status)} */}
            {issue.status}
            {/* {issue.status && capFirstLetter(issue.status)} */}
          </span>
        </div>
        {/* <h2>Issue Id: {issue._id}</h2> */}
        <h3>
          Priority:{" "}
          <span className={`priority priority-${issue.priority}`}>
            {issue.priority}{" "}
          </span>{" "}
        </h3>
        <h3>
          Report Date:{" "}
          {new Date(issue.createdAt).toLocaleString("en-US", options)}{" "}
        </h3>
        <h2>{issue.issueType}</h2>
        <h3>{issue.title}</h3>
        <hr />
        <div className="issue-desc">
          <h3>Bug Description</h3>
          <p>{issue.description}</p>
        </div>
      </header>
      <div className="pb-sm ">
        {issue.status !== "fixed" && (
          <button onClick={onIssueClose} className="btn btn-block btn-hover ">
            Fixed
          </button>
        )}
      </div>
    </div>
  );
}

export default Issue;
