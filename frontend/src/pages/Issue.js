import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getIssue, closeIssue } from '../features/issues/issueSlice';
import {
  getNotes,
  createNote,
  reset as noteReset,
} from '../features/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Loader from '../components/Loader/Loader';
import NoteItem from '../components/NoteItem';
import { FaPlus, FaEllipsisV, FaRegPaperPlane } from 'react-icons/fa';

function Issue() {
  //open modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  //get from issues state
  const { issue, isLoading, isError, message } = useSelector(
    (state) => state.issues
  );

  //get from notes state
  const { notes } = useSelector((state) => state.notes);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: issueId } = useParams();

  //  date options argument
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getIssue(issueId));
    dispatch(getNotes(issueId));
    // eslint-disable-next-line
  }, [isError, message, issueId]);

  //on issue close
  const onIssueClose = () => {
    //
    dispatch(closeIssue(issueId));
    toast.success('Issue fixed 👍🐱‍👤');
    navigate('/issues');
  };

  //Create note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, issueId }));
    setNoteText('');
    setModalOpen(false);
  };
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h3>Look's Like Something Went Wrong!</h3>;
  }
  return (
    <div className="issue-page">
      <header className="issue-header">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <BackButton url="/issues" />
          <span className={`status status-${issue.status}`}>
            {issue.status}
          </span>
        </div>
        {new Date(issue.createdAt).toLocaleString('en-US', options)}{' '}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>{issue.issueType}</h2>
          <span className={`priority priority-${issue.priority}`}>
            {issue.priority}{' '}
          </span>{' '}
        </div>
        <h3>{issue.title}</h3>
        <div className="issue-desc">
          <p>{issue.description}</p>
        </div>
      </header>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3>Notes</h3>
        {issue.status !== 'fixed' && (
          <span
            onClick={() => {
              setModalOpen(true);
            }}
            className="add__button"
          >
            <FaPlus className="add__button-icon" /> Add note
          </span>
        )}
      </div>
      {modalOpen && (
        <Modal setOpenModal={setModalOpen}>
          <div className="note__modal-title">
            <h3>Add note</h3>
          </div>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                style={{ resize: 'none' }}
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Write a note..."
                value={noteText}
                cols="10"
                rows="5"
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn">Create note</button>
            </div>
          </form>
        </Modal>
      )}
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      <div className="pb-sm ">
        {issue.status !== 'fixed' && (
          <button onClick={onIssueClose} className="btn btn-block btn-hover ">
            Close Issue
          </button>
        )}
      </div>
    </div>
  );
}

export default Issue;
