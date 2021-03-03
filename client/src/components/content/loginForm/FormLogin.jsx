import React, { useContext, useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { TweenMax, Power3 } from "gsap";

import "./FormLogin.scss";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";
import { CartContext } from "../../../store/CartProvider";

import { createCartMongo, signIn } from "../../../utils/sessions";
import { Role } from "../../../helpers/roles";

import ReturnMsgAlertSuccess from "../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const FormLogin = ({ handleClose, isModalOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [partClass, setpartClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    checkSizeWindow,
    setIsActiveBtnLog,
    setIsActiveBtnReg,
    setchooseModal,
  } = useContext(NavContext);

  const {
    adjustValidationMsg,
    isTurnOnRegisterLogin,
    setisClickLogin,
    setIsAdmin,
    setUser,
    setValidationMsg,
    validationMsg,
  } = useContext(StoreContext);

  const {
    cart,
    isUserLoggedFromProceedCheckoout,
    totalPriceCart,
    totalQtyCart,
  } = useContext(CartContext);

  const isMounted = useRef(false);
  const loginRef = useRef(null);
  const timeOut = useRef(null);
  const timeOutclear = useRef(null);

  const history = useHistory();

  const urlChecker = history.location.pathname;
  const isUrlLogin = urlChecker === "/login";

  const handleChangeInput = (e) => {
    const type = e.target.type;
    const value = e.target.value;

    if (type === "email") {
      setLogin(value);
    } else if (type === "password" || "text") {
      setPassword(value);
    }

    type === "text" && value === "" && setShowPassword(false);
  };

  const stopCloseModalIfValidate = (success) => {
    if (success) {
      adjustValidationMsg(success);
      timeOut.current =
        isMounted.current &&
        setTimeout(() => {
          adjustValidationMsg("");
          setValidationMsg("");
          setisClickLogin(false);
          isUrlLogin ? null : handleClose();
        }, 1500);
    }
  };

  const resetStateInputs = () => {
    setLogin("");
    setPassword("");
    adjustValidationMsg("");
    setShowPassword(false);
  };

  const handleCloseModalByButtonX = () => {
    resetStateInputs();
    isUrlLogin ? null : handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: login,
      password: password,
    };

    const { data, status } = await signIn(userData);

    const { success, user, userId, role, email } = data;
    const person = {
      email,
      user,
      userId,
      role,
    };

    setpartClass(Object.keys(data)[0]);

    if (status === 200) {
      let orderCartData = {
        userId: userId,
        cart: cart,
        totalQtyCart: totalQtyCart,
        totalPriceCart: totalPriceCart,
      };

      setisClickLogin(true);

      cart.length > 0 &&
        isUserLoggedFromProceedCheckoout &&
        (await createCartMongo(orderCartData));

      localStorage.removeItem("cart");

      if (isUserLoggedFromProceedCheckoout && isMounted.current) {
        setUser(person);
        resetStateInputs();
        stopCloseModalIfValidate(success);
        person.role === Role.Admin ? setIsAdmin(true) : setIsAdmin(false);
        timeOut.current = setTimeout(() => history.push("/shipping"), 1500);
      }

      if (isMounted.current) {
        resetStateInputs();
        setUser(person);
        stopCloseModalIfValidate(success);
        person.role === Role.Admin ? setIsAdmin(true) : setIsAdmin(false);
      }
    } else {
      adjustValidationMsg(data.alert);
    }
  };

  const handleMoveToRegister = () => {
    if (checkSizeWindow) {
      setchooseModal(false);
      setIsActiveBtnLog(false);
      setIsActiveBtnReg(true);
    } else {
      history.push("/register");
    }
  };

  const handleShowPassword = () => {
    password ? setShowPassword((prevValue) => !prevValue) : null;
  };

  useEffect(() => {
    resetStateInputs();
  }, [isModalOpen]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeOut.current);
  }, []);

  useEffect(() => {
    timeOutclear.current = setTimeout(() => {
      if (loginRef.current) {
        TweenMax.to(loginRef.current, 0.8, {
          opacity: 1,
          y: 0,
          ease: Power3.easeOut,
        });
      }
    }, 100);

    return () => clearTimeout(timeOutclear.current);
  }, [isTurnOnRegisterLogin, loginRef.current]);

  const validateMessageLogin = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <form className="modal-login" onSubmit={handleSubmit} ref={loginRef}>
      <button
        className="modal-login__close-btn"
        type="button"
        onClick={handleCloseModalByButtonX}
      >
        <i className="fas fa-times"></i>
      </button>
      {validateMessageLogin}
      <h2 className="modal-login__title">Log In</h2>
      <div className="modal-login__wrap-input">
        <input
          type="email"
          className="modal-login__input"
          value={login}
          onChange={handleChangeInput}
          name="user"
          placeholder="Email"
          required
        />
        <label className="modal-login__label">Email: </label>
        <span className="modal-login__border" />
        <span className="modal-login__email-envelope">
          <i className="far fa-envelope"></i>
        </span>
      </div>
      <div className="modal-login__wrap-input">
        <input
          type={showPassword ? "text" : "password"}
          className="modal-login__input"
          value={password}
          onChange={handleChangeInput}
          name="password"
          placeholder="password"
          required
        />
        <label className="modal-login__label">Password: </label>
        <span className="modal-login__border" />
        <span
          className="modal-login__visible-password"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <i className="far fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </span>
      </div>
      <button className="modal-login__btn" type="submit">
        Log in
      </button>
      <p className="modal-login__not-register">
        Don't have an account?{" "}
        <span className="modal-login__singIn" onClick={handleMoveToRegister}>
          Create a new account
        </span>
      </p>
    </form>
  );
};

export default FormLogin;
