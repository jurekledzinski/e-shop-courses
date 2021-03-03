import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./TableAdvertsAdminDashboard.scss";

import { NavContext } from "../../../../../../store/NavProvider";

const TableAdvertsAdminDashboard = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
}) => {
  const { checkWindowMedium } = useContext(NavContext);
  const [newHeadersAdverts, setnewHeadersAdverts] = useState([]);

  useEffect(() => {
    let headersTabel = [];

    for (let j = 0; j < page.length; j++) {
      for (let i = 0; i < headerGroups[0].headers.length; i++) {
        headersTabel = [...headersTabel, headerGroups[0].headers[i]];
      }
    }

    const mobileHeaders = headersTabel.map((item) => {
      return {
        ...item,
        id: uuidv4(),
      };
    });

    const addHeadersMobile = headerGroups.map((item) => {
      return {
        ...item,
        headers: mobileHeaders,
      };
    });

    setnewHeadersAdverts(addHeadersMobile);
  }, [page]);

  return (
    <table className="table-adverts" {...getTableProps()}>
      <thead className="table-adverts__head">
        {checkWindowMedium
          ? headerGroups.map((headerGroups) => (
              <tr
                className="table-adverts__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-adverts__head-th"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))
          : newHeadersAdverts.map((headerGroups) => (
              <tr
                className="table-adverts__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-adverts__head-th"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={(column.getHeaderProps().key = uuidv4())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
      </thead>
      <tbody className="table-adverts__body" {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr className="table-adverts__body-tr" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className="table-adverts__body-td table-adverts__body-td--adverts"
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableAdvertsAdminDashboard;
