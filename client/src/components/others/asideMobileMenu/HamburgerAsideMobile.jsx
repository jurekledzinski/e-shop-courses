import React, { useContext } from "react";

import "./HamburgerAsideMobile.scss";

import { NavContext } from "../../../store/NavProvider";

const HamburgerAsideMobile = () => {
  const {
    isHamburgerRotate,
    setAppWrapperrActive,
    setIsHamburgerRotate,
    setHamburgerVisible,
    setShowMenuAside,
  } = useContext(NavContext);

  const handleCloseMenu = () => {
    setTimeout(() => setAppWrapperrActive(false), 1160);

    setHamburgerVisible(false);
    setIsHamburgerRotate(false);
    setShowMenuAside(false);
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

export default HamburgerAsideMobile;
