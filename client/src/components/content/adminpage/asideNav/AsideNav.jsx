import React from "react";
import { NavLink } from "react-router-dom";
import "./AsideNav.scss";

const asideLinks = [
  {
    name: "Add Course",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "add-course",
    liClassName: "aside-admin__item",
  },
  {
    name: "Edit Course",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "edit-course",
    liClassName: "aside-admin__item",
  },
  {
    name: "Remove Course",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "remove-course",
    liClassName: "aside-admin__item",
  },
  {
    name: "List users",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "list-users",
    liClassName: "aside-admin__item",
  },
  {
    name: "User courses",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "user-courses",
    liClassName: "aside-admin__item",
  },
  {
    name: "Management orders",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "management-orders",
    liClassName: "aside-admin__item",
  },
  {
    name: "Management slider",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "management-shop",
    liClassName: "aside-admin__item",
  },
  {
    name: "Remove adverts",
    nameClass: "aside-admin__link",
    activeClass: "aside-admin__link--active",
    link: "remove-adverts",
    liClassName: "aside-admin__item",
  },
];

const AsideNav = ({ url }) => {
  const links = [...asideLinks];
  const asideMenuLinks = links.map((link, index) => (
    <li className={link.liClassName} key={index}>
      <NavLink
        className={link.nameClass}
        activeClassName={link.activeClass}
        to={`${url}/${link.link}`}
      >
        {link.name}
      </NavLink>
    </li>
  ));

  return (
    <aside className="admin-wrapper__aside-admin aside-admin">
      <div className="aside-admin__wrapper">
        <ul className="aside-admin__menu">{asideMenuLinks}</ul>
      </div>
    </aside>
  );
};

export default AsideNav;
