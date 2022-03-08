import { FaArrowLeft } from "react-icons/fa";
function Modal({ setOpenModal, children }) {
  return (
    <div className="note__modal active-modal">
      <div className="note__modal-content">
        <div className="note__modal-close">
          <span
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <FaArrowLeft />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
