import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./TableUsersAdminDashboard.scss";

import { NavContext } from "../../../../../../store/NavProvider";

const TableUsersAdminDashboard = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
}) => {
  const { checkWindowMedium } = useContext(NavContext);
  const [newAddedHeaders, setNewAddedHeaders] = useState([]);

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

    setNewAddedHeaders(addHeadersMobile);
  }, [page]);
  return (
    <table className="table-users" {...getTableProps()}>
      <thead className="table-users__head">
        {checkWindowMedium
          ? headerGroups.map((headerGroups) => (
              <tr
                className="table-users__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-users__head-th"
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
          : newAddedHeaders.map((headerGroups) => (
              <tr
                className="table-users__head-tr"
                {...headerGroups.getHeaderGroupProps()}
              >
                {headerGroups.headers.map((column) => (
                  <th
                    className="table-users__head-th"
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
      <tbody className="table-users__body" {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr className="table-users__body-tr" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className="table-users__body-td table-users__body-td--users"
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

export default TableUsersAdminDashboard;
