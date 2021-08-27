import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { StoreContext } from "../store/StoreProvider";

const ProtectedRouteUser = ({ path, component: Component, location }) => {
  const { user } = useContext(StoreContext);
  const isLoggedUser = Boolean(user);

  const userId = location.pathname.slice(9);
  const idUser = Boolean(user) ? user.userId : null;

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isLoggedUser) {
          return <Redirect to="/" />;
        }
        if (userId !== idUser) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export const ProtectUser = withRouter(ProtectedRouteUser);
