import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./MenuNavigationAsideMobile.scss";

import { NavContext } from "../../../store/NavProvider";

const asideMobileLinks = [
  {
    name: "Add Course",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/add-course",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "Edit Course",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/edit-course",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "Remove Course",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/remove-course",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "List users",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/list-users",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "User courses",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/user-courses",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "Management orders",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/management-orders",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "Management slider",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/management-shop",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
  {
    name: "Remove adverts",
    nameClass: "aside-mobile__link",
    activeClass: "aside-mobile__link--active",
    link: "/admin/remove-adverts",
    liClassName: "aside-mobile__item",
    liClassMove: "aside-mobile__item--move",
  },
];

const MenuNavigationAsideMobile = () => {
  const { showMenuAside } = useContext(NavContext);
  const links = [...asideMobileLinks];
  const asideMenuLinks = links.map((link, index) => (
    <li
      className={link.liClassName}
      className={
        showMenuAside
          ? `${link.liClassMove} ${link.liClassName}`
          : ` ${link.liClassName}`
      }
      key={index}
    >
      <NavLink
        className={link.nameClass}
        activeClassName={link.activeClass}
        to={link.link}
      >
        {link.name}
      </NavLink>
    </li>
  ));

  return (
    <aside>
      <ul className="aside-mobile">{asideMenuLinks}</ul>
    </aside>
  );
};

export default MenuNavigationAsideMobile;
