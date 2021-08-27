import React, { useContext, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { NavContext } from "../../../../../../../store/NavProvider";
import { StoreContext } from "../../../../../../../store/StoreProvider";

import "./EditCourse.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TableCoursesAdminDashboard from "../../tablesAdminDasboard/TableCoursesAdminDashboard";
import EditCourseForm from "./EditCourseForm";

const EditCourse = () => {
  const { checkSizeWindow } = useContext(NavContext);
  const { courses } = useContext(StoreContext);
  const [currentValueCourse, setCurrentValueCourse] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPossibleToCloseModalOnDiv] = useState(false);
  const [isTurnOnEditForm, setIsTurnOnEditForm] = useState(false);

  const history = useHistory();

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Author", accessor: "author" },
      { Header: "On Stock", accessor: "amount" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Edit",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "edit",
        Cell: (propsTable) => (
          <button
            className="edit-courses__table-btn-edit"
            onClick={() => {
              setIsEditModalOpen(true);
              setIsTurnOnEditForm((prevValue) => !prevValue);
              setCurrentValueCourse(propsTable.row.original);
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
        ),
      },
    ],
    [courses]
  );
  const data = useMemo(() => courses, [courses]);

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

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const editForm = isEditModalOpen && checkSizeWindow && (
    <EditCourseForm
      currentValueCourse={currentValueCourse}
      handleCloseEditModal={handleCloseEditModal}
      isEditModalOpen={isEditModalOpen}
      isTurnOnEditForm={isTurnOnEditForm}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
    />
  );

  useEffect(() => {
    if (isEditModalOpen && !checkSizeWindow) {
      history.push({
        pathname: "/edit-product",
        search: `?id=${currentValueCourse._id}`,
        state: { product: currentValueCourse },
      });
    }
  }, [checkSizeWindow, isEditModalOpen]);

  return (
    <section>
      <div className="admin-content__edit-courses edit-courses">
        <h2 className="edit-courses__title">Edit course</h2>
        <div className="edit-courses__tabel">
          <GlobalFilter
            data={courses}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
          <TableCoursesAdminDashboard
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
        {editForm}
      </div>
    </section>
  );
};

export default EditCourse;
