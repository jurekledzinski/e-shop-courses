import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";

import "./NavMobileMenu.scss";

import { logOutUser } from "../../../utils/sessions";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";
import { CartContext } from "../../../store/CartProvider";

const NavMobileMenu = ({
  isActiveBtnLog,
  isAdmin,
  isActiveBtnReg,
  setIsActiveBtnLog,
  setIsActiveBtnReg,
  setProperlyLabel,
  totalQtyCart,
  user,
}) => {
  const {
    setAppWrapperrActive,
    setHamburgerVisible,
    setIsHamburgerRotate,
    showHideMobileMenu,
    setsHowHideMobileMenu,
  } = useContext(NavContext);

  const { setIsAdmin, setPaidOrderDetails, setUser } = useContext(StoreContext);

  const {
    clearCart,
    setIsUserLogged,
    setIsUserLoggedFromProceedCheckoout,
  } = useContext(CartContext);

  const isUserLogged = Boolean(user);
  const history = useHistory();
  const timeOutClear = useRef();

  const userProfile = isUserLogged && (
    <li
      className={
        showHideMobileMenu
          ? "nav-second__link--move nav-second__link"
          : "nav-second__link"
      }
    >
      <NavLink
        activeClassName="nav-second__link--active"
        className="nav-second__item-link"
        to={`/profile/${user.userId}`}
      >
        Profile
      </NavLink>
    </li>
  );

  const adminProfile = isAdmin && (
    <li
      className={
        showHideMobileMenu
          ? "nav-second__link--move nav-second__link"
          : "nav-second__link"
      }
    >
      <NavLink
        activeClassName="nav-second__link--active"
        className="nav-second__item-link"
        to={`/admin-profile/${user.userId}`}
      >
        Profile
      </NavLink>
    </li>
  );

  const defaultStateMenuMobile = () => {
    setTimeout(() => setAppWrapperrActive(false), 1000);
    setHamburgerVisible(false);
    setIsHamburgerRotate(false);
    setsHowHideMobileMenu(false);
  };

  const redirectToHomePage = () => {
    history.push("/");
  };

  const handleLoginInMobile = () => {
    defaultStateMenuMobile();
    if (!isUserLogged) {
      setIsActiveBtnReg(false);
      setIsActiveBtnLog(true);
      timeOutClear.current = setTimeout(() => history.push("/login"), 1010);
    } else {
      timeOutClear.current = timeOutClear.current = setTimeout(() => {
        clearCart();
        logOutUser();
        redirectToHomePage();
        setIsUserLogged(false);
        setIsUserLoggedFromProceedCheckoout(false);
        setIsAdmin(false);
        setUser(null);
        setIsActiveBtnLog(false);
        setPaidOrderDetails([]);
      }, 1100);
    }
  };

  const handleRegisterInMobile = () => {
    setIsActiveBtnReg(true);
    setIsActiveBtnLog(false);
    defaultStateMenuMobile();
    timeOutClear.current = setTimeout(() => history.push("/register"), 1010);
  };

  useEffect(() => {
    () => clearTimeout(timeOutClear.current);
  }, []);

  useEffect(() => {
    const url = history.location.pathname;
    const signInUrl = "/register";
    const logInUrl = "/login";
    url !== signInUrl ? setIsActiveBtnReg(false) : null;
    url !== logInUrl ? setIsActiveBtnLog(false) : null;
  }, [history.location]);

  return (
    <nav>
      <ul className="nav-second">
        <li
          className={
            showHideMobileMenu
              ? "nav-second__link--move nav-second__link"
              : "nav-second__link"
          }
        >
          {Boolean(user) ? `Welcome ${user.user}` : `Welcome`}
        </li>
        <li
          className={
            showHideMobileMenu
              ? "nav-second__link--move nav-second__link"
              : "nav-second__link"
          }
        >
          <NavLink
            exact
            activeClassName="nav-second__link--active"
            className="nav-second__item-link"
            to="/"
          >
            All courses
          </NavLink>
        </li>
        {isUserLogged && (
          <li
            className={
              showHideMobileMenu
                ? "nav-second__link--move nav-second__link"
                : "nav-second__link"
            }
          >
            <NavLink
              activeClassName="nav-second__link--active"
              className="nav-second__item-link"
              to={`/user-courses/${user.userId}`}
            >
              My courses
            </NavLink>
          </li>
        )}
        {isAdmin ? adminProfile : userProfile}
        {isAdmin && (
          <li
            className={
              showHideMobileMenu
                ? "nav-second__link--move nav-second__link"
                : "nav-second__link"
            }
          >
            <NavLink
              activeClassName="nav-second__link--active"
              className="nav-second__item-link"
              to="/admin"
            >
              Admin
            </NavLink>
          </li>
        )}
        <li
          className={
            showHideMobileMenu
              ? "nav-second__link--move nav-second__link nav-second__shopping-cart"
              : "nav-second__link nav-second__shopping-cart"
          }
        >
          <NavLink
            activeClassName="nav-second__link--active"
            className="nav-second__item-link"
            to="/shopping-cart"
          >
            Cart <i className="fas fa-shopping-cart"></i>
            <span className="nav-second__total-amount-products">
              {totalQtyCart}
            </span>
          </NavLink>
        </li>
        {Boolean(!user) && (
          <li
            className={
              showHideMobileMenu
                ? "nav-second__link--move nav-second__link"
                : "nav-second__link"
            }
          >
            <button
              className={
                isActiveBtnReg
                  ? "nav-second__register--active"
                  : "nav-second__register"
              }
              onClick={handleRegisterInMobile}
            >
              Sign up
            </button>
          </li>
        )}
        <li
          className={
            showHideMobileMenu
              ? "nav-second__link--move nav-second__link"
              : "nav-second__link"
          }
        >
          <button
            className={
              isActiveBtnLog || Boolean(user)
                ? "nav-second__login--active"
                : "nav-second__login"
            }
            onClick={handleLoginInMobile}
          >
            {setProperlyLabel}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavMobileMenu;
