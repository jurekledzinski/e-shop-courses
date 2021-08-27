import React, { useRef } from "react";
import ReactDOM from "react-dom";

import "./Modal.scss";

const Modal = ({
  children,
  handleClose,
  isOpen,
  unavailableToCloseModalClickOnDiv,
}) => {
  const modalRef = useRef(null);

  const handleCloseOutside = ({ target }) => {
    const { current } = modalRef;
    if (current === target && unavailableToCloseModalClickOnDiv) {
      handleClose();
    }
  };

  const modalAll = isOpen ? (
    <div className="modal" ref={modalRef} onClick={handleCloseOutside}>
      {children}
    </div>
  ) : null;

  return ReactDOM.createPortal(modalAll, document.querySelector("#root"));
};

export default Modal;
