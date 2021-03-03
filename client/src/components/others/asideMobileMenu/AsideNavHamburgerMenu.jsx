import React, { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import "./AsideNavHamburgerMenu.scss";

import { NavContext } from "../../../store/NavProvider";

const AsideNavHamburgerMenu = () => {
  const {
    appWrapperrActive,
    setAppWrapperrActive,
    setCheckWhichMenu,
    setHamburgerVisible,
    setIsHamburgerRotate,
    setShowMenuAside,
  } = useContext(NavContext);

  const timeOutclear = useRef(null);

  const location = useLocation();
  const adminPageUrl = "/admin";
  const adminProfileUrl = "/admin-";

  const adminDashboard = location.pathname.indexOf(adminPageUrl);
  const adminProfile = location.pathname.indexOf(adminProfileUrl);
  const isShowHamburger =
    adminProfile !== -1 ? false : adminDashboard !== -1 ? true : false;

  const handleOpenAsideNavMenu = () => {
    timeOutclear.current = setTimeout(() => {
      setAppWrapperrActive(true);
      setHamburgerVisible(true);
      setIsHamburgerRotate(true);
      setShowMenuAside(true);
    }, 10);

    setCheckWhichMenu(false);
  };

  useEffect(() => {
    return () => clearTimeout(timeOutclear.current);
  }, []);

  return (
    <div
      className={
        isShowHamburger && !appWrapperrActive
          ? "admin-aside-mobile"
          : "admin-aside-mobile--hide"
      }
      onClick={() => handleOpenAsideNavMenu()}
    >
      <span className="admin-aside-mobile__hamburger-line1"></span>
      <span className="admin-aside-mobile__hamburger-line2"></span>
      <span className="admin-aside-mobile__hamburger-line3"></span>
    </div>
  );
};

export default AsideNavHamburgerMenu;
