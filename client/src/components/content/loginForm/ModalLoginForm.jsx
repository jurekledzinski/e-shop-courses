import React from "react";

import Modal from "../../others/modal/Modal";
import FormLogin from "./FormLogin";

const ModalLoginForm = ({
  handleClose,
  isModalOpen,
  isPossibleToCloseModalOnDiv,
}) => {
  return (
    <Modal
      handleClose={handleClose}
      isOpen={isModalOpen}
      unavailableToCloseModalClickOnDiv={isPossibleToCloseModalOnDiv}
    >
      <FormLogin handleClose={handleClose} isOpen={isModalOpen} />
    </Modal>
  );
};

export default ModalLoginForm;
