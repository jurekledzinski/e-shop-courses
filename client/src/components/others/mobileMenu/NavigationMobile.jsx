import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";

import { StoreContext } from "../../../store/StoreProvider";
import { CartContext } from "../../../store/CartProvider";

import NavMobileMenu from "./NavMobileMenu";

const NavigationMobile = () => {
  const { isAdmin, user } = useContext(StoreContext);
  const { totalQtyCart } = useContext(CartContext);

  const [isActiveBtnLog, setIsActiveBtnLog] = useState(false);
  const [isActiveBtnReg, setIsActiveBtnReg] = useState(false);

  const setProperlyLabel = Boolean(user) ? "Log out" : "Log in";

  return (
    <>
      <NavMobileMenu
        isActiveBtnLog={isActiveBtnLog}
        isActiveBtnReg={isActiveBtnReg}
        isAdmin={isAdmin}
        setIsActiveBtnLog={setIsActiveBtnLog}
        setIsActiveBtnReg={setIsActiveBtnReg}
        setProperlyLabel={setProperlyLabel}
        totalQtyCart={totalQtyCart}
        user={user}
      />
    </>
  );
};

export default withRouter(NavigationMobile);
