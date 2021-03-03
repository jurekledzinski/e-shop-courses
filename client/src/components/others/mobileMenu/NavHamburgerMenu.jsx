import React, { useContext } from "react";

import "./NavHamburgerMenu.scss";

import { NavContext } from "../../../store/NavProvider";

const NavHamburgerMenu = () => {
  const {
    isHamburgerRotate,
    setAppWrapperrActive,
    setIsHamburgerRotate,
    setHamburgerVisible,
    setsHowHideMobileMenu,
  } = useContext(NavContext);

  const handleCloseMenu = () => {
    setTimeout(() => setAppWrapperrActive(false), 1000);

    setHamburgerVisible(false);
    setIsHamburgerRotate(false);
    setsHowHideMobileMenu(false);
  };

  return (
    <div
      className={isHamburgerRotate ? "hamburger-2--rotate" : "hamburger-2"}
      onClick={() => handleCloseMenu()}
    >
      <span className="hamburger-2__item hamburger-2__item--1 "></span>
      <span className="hamburger-2__item hamburger-2__item--2 "></span>
      <span className="hamburger-2__item hamburger-2__item--3 "></span>
    </div>
  );
};

export default NavHamburgerMenu;
