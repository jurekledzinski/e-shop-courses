import React, { useEffect, useRef } from "react";

import { TweenMax, Power3 } from "gsap";

import Modal from "../../../../../../others/modal/Modal";
import ModalPopupWarningMessage from "./ModalPopupWarningMessage";

const RemoveCoursePopupMessage = ({
  checkIsRemoveModalOpen,
  handleCloseModalRemoveCourse,
  handleConfirmationYes,
  handleConfirmationNo,
  isPossibleToCloseModalOnDiv,
  isRemoveCourseModalOpen,
  textMsg,
}) => {
  const modalPopUpRef = useRef();
  const handleCloseModalBtnYes = () => {
    handleCloseModalRemoveCourse();
    handleConfirmationYes();
  };
  const handleCloseModalBtnNo = () => {
    handleCloseModalRemoveCourse();
    handleConfirmationNo();
  };

  useEffect(() => {
    if (modalPopUpRef.current) {
      TweenMax.to(modalPopUpRef.current, 0.8, {
        opacity: 1,
        y: 30,
        ease: Power3.easeOut,
      });
    }
  }, [checkIsRemoveModalOpen]);

  return (
    <Modal
      handleClose={handleCloseModalRemoveCourse}
      isOpen={isRemoveCourseModalOpen}
      unavailableToCloseModalClickOnDiv={isPossibleToCloseModalOnDiv}
    >
      <ModalPopupWarningMessage
        handleCloseModalBtnYes={handleCloseModalBtnYes}
        handleCloseModalBtnNo={handleCloseModalBtnNo}
        modalPopUpRef={modalPopUpRef}
        title={textMsg}
      />
    </Modal>
  );
};

export default RemoveCoursePopupMessage;
