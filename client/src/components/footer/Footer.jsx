import React from "react";

import "./Footer.scss";

const Footer = () => {
  const currentYear = new Date().toISOString().slice(0, 4);

  return (
    <footer>
      <div className="footer">
        <p className="footer__text">
          All rights reserved {currentYear} &copy; Course Shop
        </p>
      </div>
    </footer>
  );
};

export default Footer;
