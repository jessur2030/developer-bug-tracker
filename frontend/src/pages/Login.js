import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import Loader from "../components/Loader/Loader";
function Login() {
  //form data object for all fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //destructure formData
  const { email, password } = formData;
  //initialize dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch]);

  //
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //onSubmit form
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    dispatch(login(userData));
  };

  if (isLoading) {
    // return <Spinner />;
    return <Loader />;
  }

  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>
          Don't have an account?{" "}
          <Link
            to="/register"
            // style={{ textDecoration: "underline" }}
            className="text-primary-color"
          >
            Sign up
          </Link>
        </p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
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

          <div className="form-group pb-2 ">
            <button className="btn btn-block btn-hover ">Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
