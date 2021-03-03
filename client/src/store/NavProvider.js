import React, { createContext, useEffect, useState } from "react";

export const NavContext = createContext(null);

const NavProvider = ({ children }) => {
  const [appWrapperrActive, setAppWrapperrActive] = useState(false);
  const [checkWhichMenu, setCheckWhichMenu] = useState(true);
  const [chooseModal, setchooseModal] = useState(false);
  const [isActiveBtnLog, setIsActiveBtnLog] = useState(false);
  const [isActiveBtnReg, setIsActiveBtnReg] = useState(false);
  const [isHamburgerRotate, setIsHamburgerRotate] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [hamburgerVisible, setHamburgerVisible] = useState(false);
  const [showHideMobileMenu, setsHowHideMobileMenu] = useState(false);
  const [showMenuAside, setShowMenuAside] = useState(false);
  const [checkSizeWindow, setCheckSizeWindow] = useState(
    window.innerWidth >= 1024 ? true : false
  );
  const [checkWindowMedium, setCheckWindowMedium] = useState(
    window.innerWidth >= 800 ? true : false
  );

  useEffect(() => {
    const checkGlobalSizeWindow = () => {
      if (window.innerWidth >= 1024) {
        setTimeout(() => setAppWrapperrActive(false), 1160);
        setHamburgerVisible(false);
        setIsHamburgerRotate(false);
        setsHowHideMobileMenu(false);
        setCheckWhichMenu(false);
        setShowMenuAside(false);
        setCheckSizeWindow(true);
      } else {
        setCheckSizeWindow(false);
      }

      window.innerWidth >= 800
        ? setCheckWindowMedium(true)
        : setCheckWindowMedium(false);
    };
    window.addEventListener("resize", checkGlobalSizeWindow);
    return () => {
      window.removeEventListener("resize", checkGlobalSizeWindow);
    };
  }, []);

  return (
    <NavContext.Provider
      value={{
        appWrapperrActive,
        checkWhichMenu,
        checkWindowMedium,
        checkSizeWindow,
        chooseModal,
        hamburgerVisible,
        isActiveBtnLog,
        isActiveBtnReg,
        isHamburgerRotate,
        isModalOpen,
        setAppWrapperrActive,
        setCheckWhichMenu,
        setCheckWindowMedium,
        setchooseModal,
        setIsActiveBtnLog,
        setIsActiveBtnReg,
        setIsHamburgerRotate,
        setsHowHideMobileMenu,
        setHamburgerVisible,
        showHideMobileMenu,
        setShowMenuAside,
        setisModalOpen,
        showMenuAside,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export default NavProvider;
