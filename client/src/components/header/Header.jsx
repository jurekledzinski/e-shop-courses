import React, {
  useEffect,
  Fragment,
  useContext,
  useRef,
  useState,
} from "react";
import { useHistory, Link, withRouter } from "react-router-dom";

import Navigation from "./navigation/Navigation";
import Slider from "./slider/Slider";

import "./Header.scss";

import { NavContext } from "../../store/NavProvider";
import { StoreContext } from "../../store/StoreProvider";
import { CartContext } from "../../store/CartProvider";

import { logOutUser } from "../../utils/sessions";

const Header = ({ location }) => {
  const [buttonPressLogin, setButtonPressLogin] = useState(false);
  const [text, setText] = useState("");
  const [placeholderText, setPlaceHolderText] = useState("Search...");
  const [sizeWindow, setSizeWindow] = useState(window.innerWidth);
  const timeClearOut = useRef(null);

  const {
    appWrapperrActive,
    chooseModal,
    hamburgerVisible,
    isActiveBtnLog,
    isActiveBtnReg,
    isModalOpen,
    setAppWrapperrActive,
    setCheckWhichMenu,
    setchooseModal,
    setIsActiveBtnLog,
    setIsActiveBtnReg,
    setIsHamburgerRotate,
    setHamburgerVisible,
    setsHowHideMobileMenu,
    setisModalOpen,
    sizeNumberWindow,
  } = useContext(NavContext);

  const {
    isAdmin,
    setIsTurnOnRegisterLogin,
    setIsAdmin,
    setPaidOrderDetails,
    setUser,
    user,
    setSearchValue,
  } = useContext(StoreContext);
  const {
    clearCart,
    setIsUserLogged,
    setIsUserLoggedFromProceedCheckoout,
    totalQtyCart,
  } = useContext(CartContext);

  const history = useHistory();

  const setProperlyLabel = Boolean(user) ? "Log out" : "Log in";

  const handleClose = () => {
    setButtonPressLogin(false);
    setIsActiveBtnLog(false);
    setIsActiveBtnReg(false);
    setisModalOpen(false);
  };

  const redirectToHomePage = () => {
    history.push("/");
  };

  const handleModal = () => {
    if (Boolean(user)) {
      clearCart();
      logOutUser();
      redirectToHomePage();
      setIsUserLogged(false);
      setIsUserLoggedFromProceedCheckoout(false);
      setIsAdmin(false);
      setUser(null);
      setIsActiveBtnLog(false);
      setButtonPressLogin(false);
      setPaidOrderDetails([]);
    } else {
      setchooseModal(true);
      setIsActiveBtnLog(true);
      setIsActiveBtnReg(false);
      setisModalOpen(true);
      setButtonPressLogin(true);
      setIsTurnOnRegisterLogin((prevValue) => !prevValue);
    }
  };

  const handleModalRegistration = () => {
    setIsTurnOnRegisterLogin((prevValue) => !prevValue);
    setchooseModal(false);
    setIsActiveBtnReg(true);
    setisModalOpen(true);
  };

  const handleSearch = ({ target: { value } }) => {
    setText(value);
    setSearchValue(value);
    const sessionStorePage = JSON.parse(sessionStorage.getItem("page"));
    if (sessionStorePage !== 1) {
      sessionStorage.setItem("page", JSON.stringify(1));
    }
  };

  const handleOnBlurSearch = () => {
    setPlaceHolderText("Search...");
  };

  const handleOnFocusSearch = () => {
    setPlaceHolderText("");
  };

  const handleOpenHamburgerMenu = () => {
    timeClearOut.current = setTimeout(() => {
      setHamburgerVisible(true);
      setAppWrapperrActive(true);
      setIsHamburgerRotate(true);
      setsHowHideMobileMenu(true);
    }, 10);
    setCheckWhichMenu(true);
  };

  useEffect(() => {
    const resizeWindow = () => {
      setSizeWindow(window.innerWidth);
    };
    window.addEventListener("resize", resizeWindow);
    return function cleanupListenerSizeWindow() {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  useEffect(() => {
    const urlSingUp = history.location.pathname === "/register";
    const urlLogIn = history.location.pathname === "/login";

    switch (sizeWindow < 1024 && !Boolean(user)) {
      case true:
        isModalOpen && chooseModal ? history.push("/login") : null;
        isModalOpen && !chooseModal ? history.push("/register") : null;
        setisModalOpen(false);
        break;
      case false:
        if (!isModalOpen && urlLogIn && !Boolean(user)) {
          history.push("/");
          setTimeout(() => {
            setisModalOpen(true);
            setchooseModal(true);
          }, 200);
        }

        if (!isModalOpen && urlSingUp && !Boolean(user)) {
          history.push("/");
          setTimeout(() => {
            setisModalOpen(true);
            setchooseModal(false);
          }, 200);
        }
        break;
      default:
    }
  }, [isModalOpen, sizeNumberWindow, sizeWindow, user]);

  useEffect(() => {
    return () => clearTimeout(timeClearOut.current);
  }, []);

  useEffect(() => {
    const isLoginUrl = history.location.pathname;

    if (Boolean(user)) {
      setisModalOpen(false);
    }

    if (buttonPressLogin && isLoginUrl !== "/login") {
      setisModalOpen(true);
    }
  }, [buttonPressLogin, isModalOpen]);

  return (
    <Fragment>
      <header
        className={
          appWrapperrActive ? "header--position-change header" : "header"
        }
      >
        <div className="header__wrapper">
          <div className="header__logo-search">
            {sizeWindow < 767 ? (
              <Link className="header__logo-second-ver" to="/">
                <p className="header__logo-wrapper-second-ver">
                  <span className="header__logo-short-first">C</span>
                  <span className="header__logo-short-second">S</span>
                </p>
              </Link>
            ) : (
              <Link className="header__logo" to="/">
                <p className="header__logo-wrapper">
                  <span className="header__logo-first-letter">C</span>
                  <span className="header__logo-rest-letters">ourse shop</span>
                </p>
              </Link>
            )}
            <div className="header__search">
              <input
                className="header__search-input"
                type="text"
                onBlur={handleOnBlurSearch}
                onFocus={handleOnFocusSearch}
                onChange={handleSearch}
                placeholder={placeholderText}
                value={text}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <Navigation
            chooseModal={chooseModal}
            handleClose={handleClose}
            handleModalRegistration={handleModalRegistration}
            handleModal={handleModal}
            isActiveBtnLog={isActiveBtnLog}
            isActiveBtnReg={isActiveBtnReg}
            isAdmin={isAdmin}
            isModalOpen={isModalOpen}
            setProperlyLabel={setProperlyLabel}
            totalQtyCart={totalQtyCart}
            user={user}
          />
          <div
            className={
              hamburgerVisible
                ? "header__hamburger-menu--hide"
                : "header__hamburger-menu"
            }
            onClick={() => handleOpenHamburgerMenu()}
          >
            <span className="header__hamburger-line1"></span>
            <span className="header__hamburger-line2"></span>
            <span className="header__hamburger-line3"></span>
          </div>
        </div>
      </header>
      <section style={location.pathname !== "/" ? { display: "none" } : null}>
        <Slider location={location.pathname} />
      </section>
    </Fragment>
  );
};

export default withRouter(Header);
