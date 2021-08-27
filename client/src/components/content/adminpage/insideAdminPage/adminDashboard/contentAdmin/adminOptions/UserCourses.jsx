import React, { useContext, useMemo } from "react";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { StoreContext } from "../../../../../../../store/StoreProvider";

import "./UserCourses.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TableUsersCoursesAdminDashBoard from "../../tablesAdminDasboard/TableUsersCoursesAdminDashBoard";

const UserCourses = () => {
  const { allBoughtCoursesByUser } = useContext(StoreContext);

  const columns = useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      {
        Header: "Surname",
        accessor: "surname",
      },
      {
        Header: "Courses",
        accessor: (cart) => cart.title,
        Cell: (propsTable) =>
          propsTable.row.original.cart.map((item, index) => {
            return <p key={index}>{item.title}</p>;
          }),
      },
    ],
    [allBoughtCoursesByUser]
  );
  const data = useMemo(() => allBoughtCoursesByUser, [allBoughtCoursesByUser]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <section>
      <div className="admin-content__list-users-courses list-users-courses">
        <h2 className="list-users-courses__title">Users courses</h2>
        <div className="list-users-courses__tabel">
          <GlobalFilter
            data={allBoughtCoursesByUser}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
          <TableUsersCoursesAdminDashBoard
            getTableProps={getTableProps}
            getTableBodyProps={getTableBodyProps}
            headerGroups={headerGroups}
            page={page}
            prepareRow={prepareRow}
          />
          <ControlPrevNextPage
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            pageIndex={pageIndex}
            pageOptions={pageOptions}
            previousPage={previousPage}
          />
        </div>
      </div>
    </section>
  );
};

export default UserCourses;
