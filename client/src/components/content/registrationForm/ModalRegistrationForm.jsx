import React from "react";

import Modal from "../../others/modal/Modal";
import FormRegistration from "./FormRegistration";

const ModalRegistrationForm = ({
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
      <FormRegistration handleClose={handleClose} isModalOpen={isModalOpen} />
    </Modal>
  );
};

export default ModalRegistrationForm;
