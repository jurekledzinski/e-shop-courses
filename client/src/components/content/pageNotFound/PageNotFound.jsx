import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <p className="page-not-found__text">404 | Page not found</p>
      <Link className="page-not-found__button" to="/">
        Back home
      </Link>
    </div>
  );
};

export default PageNotFound;
