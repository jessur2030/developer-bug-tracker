import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Loader from "../components/Loader/Loader";

function Register() {
  //form data object for all fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //destructure formData
  const { name, email, password, confirmPassword } = formData;
  //initialize dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //
  useEffect(() => {
    //
    if (isError) {
      toast.error(message);
    }
    //Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch]);

  //onChange
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //onSubmit form
  const onSubmit = (e) => {
    e.preventDefault();
    //
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <section className="heading">
        <h1>Create account</h1>
        <p>
          Have an account?{" "}
          <Link
            to="/login"
            // style={{ textDecoration: "underline" }}
            className="text-primary-color"
          >
            Sign in
          </Link>
        </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="form-group pb-2 ">
            <button className="btn btn-block btn-hover ">Continue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
