import { useState } from "react";
import { toast } from "react-toastify";
// import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

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
    //
    if (password !== confirmPassword) {
      toast.error("passwords do not match");
    }
  };
  return (
    <>
      <section className="heading">
        <h1>Create account</h1>
        <p>
          Have an account?{" "}
          <Link to="/login" className="">
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
            <button className="btn btn-block ">Continue</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
