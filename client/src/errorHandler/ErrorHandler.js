import React, { useContext } from "react";

import { StoreContext } from "../store/StoreProvider";

import InternalServerError from "../components/content/inventoryIssue/InventoryIssue";

const ErrorHandler = ({ children }) => {
  const { errorServerMsg } = useContext(StoreContext);

  switch (errorServerMsg.statusCode) {
    case 500:
      return <InternalServerError />;
    default:
      return children;
  }
};

export default ErrorHandler;
