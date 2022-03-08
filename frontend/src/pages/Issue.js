import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import Modal from "react-modal";
import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getIssue, closeIssue } from "../features/issues/issueSlice";
import { getNotes, reset as noteReset } from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader/Loader";
import NoteItem from "../components/NoteItem";
import { FaPlus, FaEllipsisV, FaRegPaperPlane } from "react-icons/fa";
// import { capFirstLetter } from "../utils/utils";

function Issue() {
  //open modal state
  const [modalOpen, setModalOpen] = useState(false);

  const [noteText, setNoteText] = useState("");

  //get from issues state
  const { issue, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.issues
  );

  //get from notes state
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

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
    dispatch(getNotes(issueId));
    // eslint-disable-next-line
  }, [isError, isError, issueId]);

  //on issue close
  const onIssueClose = () => {
    //
    dispatch(closeIssue(issueId));
    toast.success("Issue fixed 👍🐱‍👤");
    navigate("/issues");
  };

  //Create note
  const onNoteSubmit = (e) => {
    e.preventDefault();
    console.log("add notes");
    setModalOpen(false);
  };

  //Open / close modal
  // const openModal = () => setModalIsOpen(true);
  // const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
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
        {/* <h3>
          Report Date:{" "}
          {new Date(issue.createdAt).toLocaleString("en-US", options)}{" "}
        </h3> */}
        {new Date(issue.createdAt).toLocaleString("en-US", options)}{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{issue.issueType}</h2>
          <span className={`priority priority-${issue.priority}`}>
            {issue.priority}{" "}
          </span>{" "}
        </div>
        {/* <h3>
          <span className={`priority priority-${issue.priority}`}>
            {issue.priority}{" "}
          </span>{" "}
        </h3> */}
        <h3>{issue.title}</h3>
        {/* <hr /> */}
        <div className="issue-desc">
          <p>{issue.description}</p>
        </div>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notes</h3>
        {issue.status !== "fixed" && (
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
                style={{ resize: "none" }}
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Add a note..."
                value={noteText}
                cols="10"
                rows="5"
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <button className="btn">
                <FaRegPaperPlane /> Send
              </button>
            </div>
          </form>
          {/* <div className="note__modal-description">
            <p>The next page looks amazing. Hope you want to go there!</p>
          </div> */}
        </Modal>
      )}

      {/* 
      {issue.status !== "fixed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add note
        </button>
      )} */}

      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          <FaTimes />
        </button>

        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Add a note... "
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn">
              <FaRegPaperPlane /> Post
            </button>
          </div>
        </form>
      </Modal> */}

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
      <div className="pb-sm ">
        {issue.status !== "fixed" && (
          <button onClick={onIssueClose} className="btn btn-block btn-hover ">
            Closed
          </button>
        )}
      </div>
    </div>
  );
}

export default Issue;
