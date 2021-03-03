import React from "react";

import { Role } from "../../../helpers/roles";

import "./BoughtProductByUser.scss";

const BoughtProductByUser = ({
  author,
  description,
  imagePath,
  title,
  totalQtyProduct,
  user,
}) => {
  return (
    <div className="bought-course">
      <article className="bought-course__article">
        <img className="bought-course__image" src={imagePath} alt={title} />
        <h4 className="bought-course__title">{title}</h4>
        <div className="bought-course__section">
          <p className="bought-course__author">Authors: {author}</p>
          {user.role === Role.User && (
            <p className="bought-course__totalQtyProduct">
              Amount bought: {totalQtyProduct}
            </p>
          )}
          <div
            className={
              user.role === Role.User
                ? "bought-course__decription"
                : "bought-course__decription--admin"
            }
          >
            <h4 className="bought-course__description-title">Description</h4>
            <p className="bought-course__text">{description}</p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BoughtProductByUser;
