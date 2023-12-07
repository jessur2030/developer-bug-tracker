import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIssues, reset } from '../features/issues/issueSlice';
import Loader from '../components/Loader/Loader';
import BackButton from '../components/BackButton';
// import IssueItem from "../components/IssueItem";
import IssueCardItem from '../components/IssueCardItem';

function Issues() {
  const { issues, isLoading, isSuccess } = useSelector((state) => state.issues);

  //initialize dispatch
  const dispatch = useDispatch();
  //clear state on unmount
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getIssues());
  }, [dispatch]);

  //if loading: show loader
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {/* <BackButton url="/" />
      <div>
        <div className="issue-headings">
          <div>Date</div>
          <div>Issue</div>
          <div>Status</div>
          <div></div>
        </div>
        {issues.map((issue) => (
          <IssueItem key={issue._id} issue={issue} />
        ))}
      </div> */}
      <BackButton url="/" />
      <div className="cards">
        {/* <div className="issue-headings">
          <div>Date</div>
          <div>Issue</div>
          <div>Status</div>
          <div></div>
        </div> */}
        {issues.map((issue) => (
          <IssueCardItem key={issue._id} issue={issue} />
        ))}
      </div>
    </>
  );
}

export default Issues;
