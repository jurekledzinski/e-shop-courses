import React, { Fragment, useContext } from "react";

import { StoreContext } from "../../../../store/StoreProvider";

import Profile from "./Profile";

const ProfileUser = () => {
  const {
    adjustValidationMsg,
    paidOrderDetails,
    user,
    validationMsg,
  } = useContext(StoreContext);

  return (
    <Fragment>
      <Profile
        adjustValidationMsg={adjustValidationMsg}
        orderPaidByCustomers={paidOrderDetails}
        user={user}
        validationMsg={validationMsg}
      />
    </Fragment>
  );
};

export default ProfileUser;
