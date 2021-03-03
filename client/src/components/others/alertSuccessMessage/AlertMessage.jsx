import React from "react";

import "./AlertMessage.scss";

const AlertMessage = ({ validationMsg }) => {
  return validationMsg ? (
    <p className="alert-message">{validationMsg}</p>
  ) : null;
};

export default AlertMessage;
