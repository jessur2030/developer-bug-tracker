import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

function BackButton({ url }) {
  return (
    // <Link to={url} className="btn btn-reverse btn-back">
    <Link to={url} className="back__button ">
      <FaArrowLeft className="back__button-icon" />
      Back
    </Link>
  );
}

export default BackButton;
