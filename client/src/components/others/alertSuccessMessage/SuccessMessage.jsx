import React from "react";

import "./SuccessMessage.scss";

const SuccessMessage = ({ validationMsg }) => {
  return validationMsg ? (
    <p className="success-message">{validationMsg}</p>
  ) : null;
};

export default SuccessMessage;
