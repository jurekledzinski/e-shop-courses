import React, { useContext } from "react";

import "./LoginPageMobile.scss";

import { StoreContext } from "../../../store/StoreProvider";

import FormLogin from "./FormLogin";

const LoginPageMobile = () => {
  const { isClickLogin, user } = useContext(StoreContext);

  return (
    <div className="page-login">
      {user === null && <div className="page-login__cover"></div>}
      {!Boolean(user) ? <FormLogin /> : isClickLogin ? <FormLogin /> : null}
    </div>
  );
};
export default LoginPageMobile;
