import React, { Fragment, useContext } from "react";

import { StoreContext } from "../../../../store/StoreProvider";

import Profile from "./Profile";

const ProfileAdmin = () => {
  const {
    adjustValidationMsg,
    adminPaidOrders,
    user,
    validationMsg,
  } = useContext(StoreContext);

  return (
    <Fragment>
      <Profile
        adjustValidationMsg={adjustValidationMsg}
        orderPaidByCustomers={adminPaidOrders}
        user={user}
        validationMsg={validationMsg}
      />
    </Fragment>
  );
};

export default ProfileAdmin;
