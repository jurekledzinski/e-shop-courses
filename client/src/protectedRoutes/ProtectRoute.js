import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { StoreContext } from "../store/StoreProvider";

const ProtectRoute = ({ path, component: Component }) => {
  const { user } = useContext(StoreContext);
  const isLoggedUser = Boolean(user);

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isLoggedUser) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export const Protect = withRouter(ProtectRoute);
