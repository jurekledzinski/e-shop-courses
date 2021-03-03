import React from "react";
import { useRouteMatch } from "react-router-dom";

import AsideNav from "../asideNav/AsideNav";
import ContentAdminPage from "../insideAdminPage/routesToContentAdminPage/ContentAdminPage";

import "./AdminPage.scss";

const Adminpage = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <section>
      <div className="admin-wrapper">
        <h2 className="admin-wrapper__title">Admin Dashboard</h2>
        <div className="admin-wrapper__content">
          <AsideNav url={url} />
          <ContentAdminPage path={path} {...props} />
        </div>
      </div>
    </section>
  );
};

export default Adminpage;
