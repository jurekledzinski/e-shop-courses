import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { StoreContext } from "../store/StoreProvider";

const ProtectedRouteAdmin = ({ path, roles, component: Component }) => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isUserLogged) {
          return <Redirect to="/" />;
        }
        if (roles && roles.indexOf(user.role) === -1) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export const ProtectAdmin = withRouter(ProtectedRouteAdmin);
