import React, { useContext, useEffect, Fragment, useState } from "react";
import "./Courses.styles.scss";

import { StoreContext } from "../../../store/StoreProvider";

import Course from "../../others/course/Course";
import Pagination from "../../others/pagiantion/Pagination";

const Courses = () => {
  const { courses, searchValue } = useContext(StoreContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage] = useState(8);

  const indexLastProduct = currentPage * productsPage;
  const indexFirstProduct = indexLastProduct - productsPage;

  const searchedCourse = courses.filter((item) => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  const copyCourses = [...searchedCourse];

  const currentProducts = copyCourses.slice(
    indexFirstProduct,
    indexLastProduct
  );

  const listCourses = currentProducts.map((course) => (
    <Course key={course._id} {...course} />
  ));

  const handlepaginatePages = (value) => {
    setCurrentPage(value);
    sessionStorage.setItem("page", JSON.stringify(value));

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const sessionStorePage = JSON.parse(sessionStorage.getItem("page"));
    if (sessionStorePage) {
      setCurrentPage(sessionStorePage);
    }
  }, [currentPage, searchValue]);

  return (
    <Fragment>
      <section>
        <div className="courses-wrapper">{listCourses}</div>
      </section>
      <Pagination
        currentPage={currentPage}
        handlepaginatePages={handlepaginatePages}
        productsOnPage={productsPage}
        totalQtyProducts={copyCourses.length}
      />
    </Fragment>
  );
};
export default Courses;
