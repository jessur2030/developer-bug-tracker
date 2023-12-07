import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createIssue, reset } from '../features/issues/issueSlice';
import { useEffect } from 'react';
import BackButton from '../components/BackButton';

function NewIssue() {
  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess, message } = useSelector((state) => state.issues);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [issueType, setIssueType] = useState('Bug');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Critical');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/issues');
    }

    dispatch(reset());
  }, [dispatch, isError, message, isSuccess, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createIssue({ issueType, title, description, priority }));
  };

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
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Developer Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={email}
            disabled
          />
        </div>

        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="issueType">Issue</label>
            <select
              name="issueType"
              id="issueType"
              value={issueType}
              required
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
              required
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
              required
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
              required
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className="form-group pb-sm  ">
            <button className="btn btn-block ">Add Issue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewIssue;
