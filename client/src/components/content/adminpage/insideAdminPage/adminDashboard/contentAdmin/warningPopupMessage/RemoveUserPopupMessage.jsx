import React, { useEffect, useRef } from "react";

import { TweenMax, Power3 } from "gsap";

import Modal from "../../../../../../others/modal/Modal";
import ModalPopupWarningMessage from "./ModalPopupWarningMessage";

const RemoveUserPopupMessage = ({
  checkIsRemoveModalOpen,
  handleCloseModalRemoveUser,
  handleConfirmationYes,
  handleConfirmationNo,
  isPossibleToCloseModalOnDiv,
  isRemoveUserModalOpen,
  textMsg,
}) => {
  const modalUserPopUpRef = useRef();
  const handleCloseModalBtnYes = () => {
    handleCloseModalRemoveUser();
    handleConfirmationYes();
  };

  const handleCloseModalBtnNo = () => {
    handleCloseModalRemoveUser();
    handleConfirmationNo();
  };

  useEffect(() => {
    if (modalUserPopUpRef.current) {
      TweenMax.to(modalUserPopUpRef.current, 0.8, {
        opacity: 1,
        y: 30,
        ease: Power3.easeOut,
      });
    }
  }, [checkIsRemoveModalOpen]);
  return (
    <Modal
      handleClose={handleCloseModalRemoveUser}
      isOpen={isRemoveUserModalOpen}
      unavailableToCloseModalClickOnDiv={isPossibleToCloseModalOnDiv}
    >
      <ModalPopupWarningMessage
        handleCloseModalBtnYes={handleCloseModalBtnYes}
        handleCloseModalBtnNo={handleCloseModalBtnNo}
        modalPopUpRef={modalUserPopUpRef}
        title={textMsg}
      />
    </Modal>
  );
};

export default RemoveUserPopupMessage;
