import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./TabelManagementOrders.scss";

import { NavContext } from "../../../../../../store/NavProvider";

const TabelManagementOrders = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  page,
  prepareRow,
}) => {
  const { checkWindowMedium } = useContext(NavContext);
  const [newHeadersMobile, setNewHeadersMobile] = useState([]);

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

    setNewHeadersMobile(addHeadersMobile);
  }, [page]);

  return (
    <div>
      <table {...getTableProps()} className="table-management-orders">
        <thead className="table-management-orders__head">
          {checkWindowMedium
            ? headerGroups.map((headerGroups) => (
                <tr
                  className="table-management-orders__head-tr"
                  {...headerGroups.getHeaderGroupProps()}
                >
                  {headerGroups.headers.map((column) => (
                    <th
                      className="table-management-orders__head-th"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))
            : newHeadersMobile.map((headerGroups) => (
                <tr
                  className="table-management-orders__head-tr"
                  {...headerGroups.getHeaderGroupProps()}
                >
                  {headerGroups.headers.map((column) => (
                    <th
                      className="table-management-orders__head-th"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={(column.getHeaderProps().key = uuidv4())}
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? "▼"
                            : "▲"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
        </thead>
        <tbody
          className="table-management-orders__body"
          {...getTableBodyProps()}
        >
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                className="table-management-orders__body-tr"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="table-management-orders__body-td table-management-orders__body-td--currency"
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
    </div>
  );
};

export default TabelManagementOrders;
