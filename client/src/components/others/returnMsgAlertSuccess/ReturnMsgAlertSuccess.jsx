import React from "react";

import "./ReturnMsgAlertSuccess.scss";

const ReturnMsgAlertSuccess = ({ partClass, msg }) => {
  return msg ? <p className={`validation-msg-${partClass}`}>{msg}</p> : null;
};

export default ReturnMsgAlertSuccess;
