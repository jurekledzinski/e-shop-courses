import React, { useContext } from "react";
import "./UserCourses.scss";

import { StoreContext } from "../../../store/StoreProvider";

import BoughtProductByUser from "../../others/boughtProductByUser/BoughtProductByUser";
import { Role } from "../../../helpers/roles";

const UserCourses = () => {
  const { boughtCourses, courses, user } = useContext(StoreContext);

  let userBoughtCourses = boughtCourses.map((item) => (
    <BoughtProductByUser key={item._id} {...item} user={user} />
  ));

  let adminCourses = courses.map((item) => {
    return <BoughtProductByUser key={item._id} {...item} user={user} />;
  });

  return (
    <section>
      <div className="user-bought-product">
        {boughtCourses.length === 0 && user.role === Role.User ? (
          <h2 className="user-bought-product__title">
            You didn't buy any courses yet
          </h2>
        ) : null}
        {boughtCourses.length > 0 && Role.User === user.role
          ? userBoughtCourses
          : null}
        {adminCourses.length === 0 && Role.Admin === user.role ? (
          <h2 className="user-bought-product__title">
            You didn't add any product yet
          </h2>
        ) : null}
        {Role.Admin === user.role ? adminCourses : null}
      </div>
    </section>
  );
};

export default UserCourses;
