import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createIssue, reset } from "../features/issues/issueSlice";
import Loader from "../components/Loader/Loader";
import { useEffect } from "react";
import BackButton from "../components/BackButton";
// import { FaPlus } from "react-icons/fa";

function NewIssue() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.issue
  );

  console.log(isError);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [issueType, setIssueType] = useState("Task");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Normal");

  //initialize dispatch
  const dispatch = useDispatch();
  //initialize navigate
  const navigate = useNavigate();

  //use Effect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate("/issues");
    }

    dispatch(reset());
  }, [dispatch, isError, message, isSuccess, navigate]);

  //on submit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createIssue({ issueType, title, description, priority }));
    //
  };

  //if loading: show loader
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create new Issue</h1>
        {/* <p>Please fill out the form bellow</p> */}
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={email} disabled />
        </div>

        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="issueType">Issue Type</label>
            <select
              name="issueType"
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="Task">Task</option>
              <option value="Bug">Bug</option>
              <option value="Request">Request</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              name="priority"
              id="priority"
              className="form-control"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="form-group pb-2 ">
            <button className="btn btn-block ">Add Issue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewIssue;
