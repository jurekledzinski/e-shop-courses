import React, { useEffect, useRef } from "react";
import { useHistory, withRouter } from "react-router-dom";

import "./ErrorFallback.scss";

const ErrorFallback = () => {
  const history = useHistory();
  const url = history.location.pathname;
  const timeOutRef = useRef(null);

  const handleRedirect = () => {
    if (url !== "/") {
      history.push("/");
      timeOutRef.current = setTimeout(() => window.location.reload(), 100);
    } else {
      return null;
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeOutRef.current);
  }, []);

  return (
    <div role="alert" className="alert">
      <span className="alert__icon">
        <i className="fas fa-exclamation"></i>
      </span>
      <p className="alert__text1">Oops, something went wrong </p>
      <span className="alert__icon-face-sad">
        <i className="far fa-frown"></i>
      </span>
      <p className="alert__text2">
        We are working on it, we'll get it fixed as soon as we can.
      </p>
      <button
        className="alert__button-redirect"
        onClick={() => handleRedirect()}
      >
        Back homepage
      </button>
    </div>
  );
};

export default withRouter(ErrorFallback);
