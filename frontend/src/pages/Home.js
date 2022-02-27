import { Link } from "react-router-dom";
import { FaPlus, FaBug } from "react-icons/fa";
function Home() {
  return (
    <>
      <section className="heading">
        <h1>Start Tracking your issues</h1>
        <p>Please choose an option below</p>
      </section>

      <Link to="/new-issue" className="btn btn-reverse btn-block">
        <FaPlus /> Create new issue
      </Link>
      <Link to="/issues" className="btn btn-block btn-hover">
        <FaBug /> View all issues
      </Link>
    </>
  );
}

export default Home;
