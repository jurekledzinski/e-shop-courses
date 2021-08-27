import React, { useContext } from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import { StoreContext } from "../store/StoreProvider";

const ProtectedRouteMyProducts = ({ path, roles, component: Component }) => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);

  const idUser = Boolean(user) ? user.userId : null;

  return (
    <Route
      path={path}
      render={(props) => {
        if (!isUserLogged) {
          return <Redirect to="/" />;
        }
        if (roles && roles.indexOf(user.role) === -1) {
          return (
            <Route
              path={`/user-courses/${idUser}`}
              render={() => <Component {...props} />}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

export const ProtectMyProducts = withRouter(ProtectedRouteMyProducts);
