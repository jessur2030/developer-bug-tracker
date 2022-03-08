import { Link } from "react-router-dom";
import { FaPlus, FaBug } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="hero">
        {" "}
        <div cla="hero-container">
          <div>
            <h1>Start Tracking your issues</h1>
            <p>
              Keep your code clear with logs of work in development, bugs
              tracked, bug sets, and collaborate with your entire team on code.
            </p>
            <div className="btn-action-container">
              <Link to="/issues" className="btn-action btn-hover btn-action">
                <FaBug /> View all issues
              </Link>
              <Link
                to="/new-issue"
                className="btn-action btn-reverse btn-action "
              >
                <FaPlus /> Create new issue
              </Link>
            </div>
          </div>
          <img src="/images/undraw_fixing_bugs.svg" alt="" />
        </div>
      </section>
      {/* <section className="heading">
        <h1>Start Tracking your issues</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to="/new-issue" className="btn btn-reverse btn-block">
        <FaPlus /> Create new issue
      </Link>
      <Link to="/issues" className="btn btn-block btn-hover">
        <FaBug /> View all issues
      </Link> */}
    </>
  );
}

export default Home;
