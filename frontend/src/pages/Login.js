import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
  };
  return (
    <>
      <section className="heading">
        <h1>Login</h1>
        <p>
          Don't have an account?{" "}
          <Link to="/login" className="">
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
            <button className="btn btn-block ">Continue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
