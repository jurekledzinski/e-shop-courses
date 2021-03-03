import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";

import "./FormRegistration.scss";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";
import { registration } from "../../../utils/sessions";

import ReturnMsgAlertSuccess from "../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const FormRegistration = ({ handleClose, isModalOpen }) => {
  const {
    checkSizeWindow,
    setIsActiveBtnLog,
    setIsActiveBtnReg,
    setchooseModal,
  } = useContext(NavContext);

  const {
    adjustValidationMsg,
    allUsers,
    isTurnOnRegisterLogin,
    setAllUsers,
    validationMsg,
  } = useContext(StoreContext);

  const history = useHistory();

  const urlChecker = history.location.pathname;
  const isUrlRegister = urlChecker === "/register";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [partClass, setpartClass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const RegisterRef = useRef(null);
  const timeOutClear = useRef(null);

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    }

    type === "text" &&
      value === "" &&
      name === "password2" &&
      setShowPassword(false);
  };

  const handleCloseModalByButtonX = () => {
    resetStateForm();
    isUrlRegister ? null : handleClose();
  };

  const validateFormError = (data) => {
    if (data.alert) {
      const { name, email, password, password2 } = data.user;
      setName(name);
      setEmail(email);
      setPassword(password);
      setPassword2(password2);
      adjustValidationMsg(data.alert);
    }
  };

  const successMessage = (data) => {
    adjustValidationMsg(data.success);
    timeOutClear.current = setTimeout(() => {
      isUrlRegister ? null : handleClose();
      adjustValidationMsg("");
    }, 1500);
  };

  const resetStateForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    adjustValidationMsg("");
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      password2,
    };

    const { data, status } = await registration(user);

    setpartClass(Object.keys(data)[0]);

    if (status === 200) {
      resetStateForm();
      successMessage(data);
      setAllUsers([...allUsers, data.newRegisteredPerson]);
      timeOutClear.current = setTimeout(() => history.push("/"), 1600);
    } else {
      validateFormError(data);
    }
  };

  const handleMoveToLogin = () => {
    if (checkSizeWindow) {
      setchooseModal(true);
      setIsActiveBtnReg(false);
      setIsActiveBtnLog(true);
    } else {
      history.push("/login");
    }
  };

  const handleShowPassword = () => {
    password2 ? setShowPassword((prevValue) => !prevValue) : null;
  };

  useEffect(() => {
    resetStateForm();
  }, [isModalOpen]);

  useEffect(() => {
    if (RegisterRef.current) {
      TweenMax.to(RegisterRef.current, 0.8, {
        opacity: 1,
        y: 0,
        ease: Power3.easeOut,
      });
    }
  }, [isTurnOnRegisterLogin]);

  useEffect(() => {
    return () => clearTimeout(timeOutClear.current);
  }, []);

  const validateMessageRegister = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <form
      className="modal-registration"
      onSubmit={handleSubmit}
      ref={RegisterRef}
    >
      <button
        className="modal-registration__close-btn"
        type="button"
        onClick={handleCloseModalByButtonX}
      >
        <i className="fas fa-times"></i>
      </button>
      {validateMessageRegister}
      <h2 className="modal-registration__title">Sign up</h2>
      <div className="modal-registration__wrap-input">
        <input
          type="text"
          className="modal-registration__input"
          value={name}
          onChange={handleChangeInput}
          name="name"
          placeholder="Name"
          required
        />
        <label className="modal-registration__label">Name: </label>
        <span className="modal-registration__border" />
        <span className="modal-registration__user">
          <i className="far fa-user"></i>
        </span>
      </div>
      <div className="modal-registration__wrap-input">
        <input
          type="email"
          className="modal-registration__input"
          value={email}
          onChange={handleChangeInput}
          name="email"
          placeholder="Email"
          required
        />
        <label className="modal-registration__label">Email: </label>
        <span className="modal-registration__border" />
        <span className="modal-registration__email">
          <i className="far fa-envelope"></i>
        </span>
      </div>
      <div className="modal-registration__wrap-input">
        <input
          type="text"
          className="modal-registration__input"
          value={password}
          onChange={handleChangeInput}
          name="password"
          placeholder="Password"
          required
        />
        <label className="modal-registration__label">Password: </label>
        <span className="modal-registration__border" />
        <span className="modal-registration__password">
          <i className="fas fa-lock"></i>
        </span>
      </div>
      <div className="modal-registration__wrap-input">
        <input
          type={showPassword ? "text" : "password"}
          className="modal-registration__input"
          value={password2}
          onChange={handleChangeInput}
          name="password2"
          placeholder="Password2"
          required
        />
        <label className="modal-registration__label">Confirm Password:</label>
        <span className="modal-registration__border" />
        <span
          className="modal-registration__password-visible"
          onClick={handleShowPassword}
        >
          {showPassword ? (
            <i className="far fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </span>
      </div>
      <button className="modal-registration__btn" type="submit">
        Sign up
      </button>
      <p className="modal-registration__not-logIn">
        Already have an account?{" "}
        <span className="modal-registration__logIn" onClick={handleMoveToLogin}>
          Login
        </span>
      </p>
    </form>
  );
};

export default FormRegistration;
