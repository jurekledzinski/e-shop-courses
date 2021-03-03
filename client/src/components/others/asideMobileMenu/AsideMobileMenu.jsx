import React, { Fragment } from "react";

import HamburgerAsideMobile from "./HamburgerAsideMobile";
import MenuNavigationAsideMobile from "./MenuNavigationAsideMobile";

const AsideMobileMenu = () => {
  return (
    <Fragment>
      <HamburgerAsideMobile />
      <MenuNavigationAsideMobile />
    </Fragment>
  );
};

export default AsideMobileMenu;
