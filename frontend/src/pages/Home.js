import { Link } from 'react-router-dom';
import { FaPlus, FaBug } from 'react-icons/fa';
function Home() {
  return (
    <>
      <section className="hero">
        {' '}
        <div className="hero-container">
          <div>
            <h1>Break issues into actionable tasks</h1>
            <p>Tackle complex issues with task lists and track their status</p>
            <div className="btn-action-container">
              <Link to="/issues" className="btn-action btn-hover btn-action">
                <FaBug /> View issues
              </Link>
              <Link
                to="/new-issue"
                className="btn-action btn-reverse btn-action "
              >
                <FaPlus /> New issue
              </Link>
            </div>
          </div>
          <img src="/images/undraw_fixing_bugs.svg" alt="" />
        </div>
      </section>
    </>
  );
}

export default Home;
