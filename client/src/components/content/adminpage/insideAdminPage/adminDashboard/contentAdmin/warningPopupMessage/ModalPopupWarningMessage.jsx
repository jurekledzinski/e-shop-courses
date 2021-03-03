import React from "react";

import "./ModalPopupWarningMessage.scss";

const ModalPopupWarningMessage = ({
  handleCloseModalBtnYes,
  handleCloseModalBtnNo,
  modalPopUpRef,
  title,
}) => {
  return (
    <div className="modal-popup" ref={modalPopUpRef}>
      <h3 className="modal-popup__title">{title}</h3>
      <div className="modal-popup__wrap-btns">
        <button className="modal-popup__btn" onClick={handleCloseModalBtnYes}>
          Yes
        </button>
        <button className="modal-popup__btn" onClick={handleCloseModalBtnNo}>
          No
        </button>
      </div>
    </div>
  );
};

export default ModalPopupWarningMessage;
