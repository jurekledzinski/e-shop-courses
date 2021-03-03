import React from "react";

import "./Pagination.scss";

const Pagination = ({
  currentPage,
  handlepaginatePages,
  productsOnPage,
  totalQtyProducts,
}) => {
  let paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(totalQtyProducts / productsOnPage); i++) {
    paginationNumbers = [...paginationNumbers, i];
  }

  const viewPagination = paginationNumbers.map((item) => (
    <ul key={item} className="pagination__wrapper">
      <li
        className={
          currentPage === item
            ? "pagination__number--active"
            : "pagination__number"
        }
        onClick={() => handlepaginatePages(item)}
      >
        {item}
      </li>
    </ul>
  ));

  return <div className="pagination">{viewPagination}</div>;
};

export default Pagination;
