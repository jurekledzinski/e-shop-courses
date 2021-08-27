import React from "react";

import "./ButtonGoBack.scss";

const ButtonGoBack = ({ history }) => {
  return (
    <button className="button-go-back" onClick={() => history.goBack()}>
      Go back
    </button>
  );
};

export default ButtonGoBack;
