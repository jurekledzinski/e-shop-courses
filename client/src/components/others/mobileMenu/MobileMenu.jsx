import React from "react";

import NavHamburgerMenu from "./NavHamburgerMenu";
import NavigationMobile from "./NavigationMobile";

const MobileMenu = () => {
  return (
    <nav>
      <NavHamburgerMenu />
      <NavigationMobile />
    </nav>
  );
};

export default MobileMenu;
