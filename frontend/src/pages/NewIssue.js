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
    (state) => state.issues
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [issueType, setIssueType] = useState("Bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Critical");

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

  console.log(issueType);
  console.log(priority);

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
          <label htmlFor="name">Developer</label>
          <input type="text" name="name" id="name" value={name} disabled />
        </div>
        <div className="form-group">
          <label htmlFor="email">Developer Email</label>
          <input type="email" name="email" id="email" value={email} disabled />
        </div>

        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="issueType">Issue</label>
            <select
              name="issueType"
              id="issueType"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
            >
              <option value="Bug">Bug</option>
              <option value="Task">Task</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">Item Name</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Item name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Bug Description</label>
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
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
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
