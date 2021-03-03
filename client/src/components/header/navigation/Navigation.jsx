import React, { Fragment } from "react";

import MenuDesktopNavigation from "../menuDesktopNavigation/MenuDesktopNavigation";

const Navigation = ({
  isActiveBtnLog,
  isAdmin,
  isActiveBtnReg,
  isModalOpen,
  chooseModal,
  handleClose,
  handleModalRegistration,
  handleModal,
  setProperlyLabel,
  totalQtyCart,
  user,
}) => {
  return (
    <Fragment>
      <MenuDesktopNavigation
        isActiveBtnLog={isActiveBtnLog}
        isAdmin={isAdmin}
        isActiveBtnReg={isActiveBtnReg}
        isModalOpen={isModalOpen}
        chooseModal={chooseModal}
        handleClose={handleClose}
        handleModalRegistration={handleModalRegistration}
        handleModal={handleModal}
        setProperlyLabel={setProperlyLabel}
        totalQtyCart={totalQtyCart}
        user={user}
      />
    </Fragment>
  );
};

export default Navigation;
