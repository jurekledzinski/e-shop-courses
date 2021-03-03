import React, { useContext } from "react";

import { StoreContext } from "../../../store/StoreProvider";

import DetailsOrderPaid from "./DetailsOrderPaid";

const DetailOrderPaidUser = (props) => {
  const { history, match } = props;
  const idOrder = match.params.id.toUpperCase();

  const {
    allPaidOrdersByUser,
    isAdmin,
    paidOrderDetails,
    setAdminPaidOrders,
    setAllPaidOrdersByUser,
    setPaidOrderDetails,
    user,
  } = useContext(StoreContext);

  return (
    <DetailsOrderPaid
      allPaidOrdersByUser={allPaidOrdersByUser}
      dataOrder={paidOrderDetails}
      history={history}
      isAdmin={isAdmin}
      idOrder={idOrder}
      setAdminPaidOrders={setAdminPaidOrders}
      setAllPaidOrdersByUser={setAllPaidOrdersByUser}
      setPaidOrderDetails={setPaidOrderDetails}
      user={user}
    />
  );
};

export default DetailOrderPaidUser;
