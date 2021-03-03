import React, { useContext } from "react";

import { StoreContext } from "../../../store/StoreProvider";

import DetailsOrderPaid from "./DetailsOrderPaid";

const DetailsOrderPaidAdmin = (props) => {
  const { history, match } = props;
  const idOrder = match.params.id.toUpperCase();

  const {
    adminPaidOrders,
    isAdmin,
    setAdminPaidOrders,
    setPaidOrderDetails,
    user,
  } = useContext(StoreContext);

  return (
    <DetailsOrderPaid
      dataOrder={adminPaidOrders}
      history={history}
      isAdmin={isAdmin}
      idOrder={idOrder}
      setAdminPaidOrders={setAdminPaidOrders}
      setPaidOrderDetails={setPaidOrderDetails}
      user={user}
    />
  );
};

export default DetailsOrderPaidAdmin;
