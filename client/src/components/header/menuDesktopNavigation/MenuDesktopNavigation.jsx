import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./MenuDesktopNavigation.scss";

import ModalLoginForm from "../../content/loginForm/ModalLoginForm";
import ModalRegistrationForm from "../../content/registrationForm/ModalRegistrationForm";

const MenuDesktopNavigation = ({
  isActiveBtnLog,
  isAdmin,
  isActiveBtnReg,
  isModalOpen,
  chooseModal,
  handleClose,
  handleModalRegistration,
  handleModal,
  setProperlyLabel,
  totalQtyCart,
  user,
}) => {
  const isUserLogged = Boolean(user);
  const [
    isPossibleToCloseModalOnDiv,
    setIsPossibleToCloseModalOnDiv,
  ] = useState(true);

  const changeForms = chooseModal ? (
    <ModalLoginForm
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
    />
  ) : (
    <ModalRegistrationForm
      handleClose={handleClose}
      isModalOpen={isModalOpen}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
    />
  );

  const userLoggedOrNot = Boolean(user) ? (
    <p className="nav__username">Welcome {user.user}</p>
  ) : (
    <li className="nav__item">
      <button
        className={
          isActiveBtnReg
            ? "nav__button-register--active"
            : "nav__button-register"
        }
        onClick={handleModalRegistration}
      >
        Sign up
      </button>
    </li>
  );

  const userLink = isUserLogged && (
    <li className="nav__item">
      <NavLink
        activeClassName="nav__active"
        to={`/user-courses/${user.userId}`}
        className="nav__link"
      >
        My courses
      </NavLink>
    </li>
  );

  const userProfile = isUserLogged && (
    <li className="nav__item">
      <NavLink
        activeClassName="nav__active"
        to={`/profile/${user.userId}`}
        className="nav__link"
      >
        Profile
      </NavLink>
    </li>
  );

  const adminProfile = isAdmin && (
    <li className="nav__item">
      <NavLink
        activeClassName="nav__active"
        to={`/admin-profile/${user.userId}`}
        className="nav__link"
      >
        Profile
      </NavLink>
    </li>
  );

  const AdminLink = isAdmin && (
    <li className="nav__item">
      <NavLink activeClassName="nav__active" to="/admin" className="nav__link">
        Admin
      </NavLink>
    </li>
  );

  return (
    <nav className="nav">
      <ul className="nav__menu">
        <li className="nav__item">
          <NavLink
            exact
            activeClassName="nav__active"
            to="/"
            className="nav__link"
          >
            All Courses
          </NavLink>
        </li>
        {userLink}
        {isAdmin ? adminProfile : userProfile}
        {AdminLink}
        <li className="nav__shooping-cart">
          <NavLink
            activeClassName="nav__active"
            className="nav__link"
            to="/shopping-cart"
          >
            <i className="fas fa-shopping-cart"></i>
            <span className="nav__amount-products">{totalQtyCart}</span>
          </NavLink>
        </li>
        {userLoggedOrNot}
        <li className="nav__item">
          <button
            className={
              isActiveBtnLog || Boolean(user)
                ? "nav__button-login--active"
                : "nav__button-login"
            }
            onClick={handleModal}
          >
            {setProperlyLabel}
          </button>
        </li>
      </ul>
      {changeForms}
    </nav>
  );
};

export default MenuDesktopNavigation;
