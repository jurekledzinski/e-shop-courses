import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { StoreContext } from "../../../../../../../store/StoreProvider";

import {
  removeCourse,
  removeCustomersReviews,
} from "../../../../../../../utils/sessions";

import "./RemoveCourse.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TableCoursesAdminDashboard from "../../tablesAdminDasboard/TableCoursesAdminDashboard";

import RemoveCoursePopupMessage from "../warningPopupMessage/RemoveCoursePopupMessage";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";
import useDeleteImage from "../../../../../../../customHooks/useDeleteImage";

const RemoveCourse = () => {
  const {
    adjustValidationMsg,
    courses,
    setCourses,
    setErrorServerMsg,
    setIsloadFirstTimePage,
    validationMsg,
  } = useContext(StoreContext);

  const [checkIsRemoveModalOpen, setCheckIsRemoveModalOpen] = useState(false);
  const [isPossibleToCloseModalOnDiv] = useState(false);
  const [isRemoveCourseModalOpen, setIsRemoveCourseModalOpen] = useState(false);
  const [idRow, setIdrow] = useState("");
  const [partClass, setpartClass] = useState("");
  const [urlRemoveInFireBase, setUrlRemoveInFireBase] = useState("");

  const isMounted = useRef(null);

  const { deleteImageInFirebase } = useDeleteImage(urlRemoveInFireBase);

  const showAndHideMsgValidate = (message) => {
    if (message) {
      adjustValidationMsg(message);
      setTimeout(() => {
        adjustValidationMsg("");
      }, 1500);
    } else {
      return adjustValidationMsg(message);
    }
  };

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "title" },
      { Header: "Author", accessor: "author" },
      { Header: "On Stock", accessor: "amount" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Delete",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (propsTable) => (
          <button
            className="list-courses__btn-remove"
            onClick={() => {
              setIdrow(propsTable.row.original._id);
              setUrlRemoveInFireBase(propsTable.row.original.imagePath);
              setCheckIsRemoveModalOpen((prevValue) => !prevValue);
              setIsRemoveCourseModalOpen(true);
            }}
          >
            <i className="fas fa-times"></i>
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

  const deleteCourse = async () => {
    const { data, status } = await removeCourse(idRow);

    setpartClass(Object.keys(data)[0]);

    let copyData = data;

    if (status === 200 && isMounted.current) {
      let coursesCopy = [...courses];
      let newCoursesAfterDelete = coursesCopy.filter(
        (course) => course._id !== idRow
      );
      setCourses(newCoursesAfterDelete);

      showAndHideMsgValidate(copyData.success);

      const { data, status } = await removeCustomersReviews(idRow);

      setIdrow("");
      setIsloadFirstTimePage(true);
      deleteImageInFirebase();

      status !== 200 ? setErrorServerMsg(data) : null;
    } else {
      showAndHideMsgValidate(copyData.alert);
      setIdrow("");
      setErrorServerMsg(data);
    }
  };

  const handleCloseModalRemoveCourse = () => {
    setIsRemoveCourseModalOpen(false);
    setIdrow("");
  };

  const handleConfirmationYes = () => {
    deleteCourse();
  };

  const handleConfirmationNo = () => {
    setIdrow("");
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const popUpMsgAskRemoveCourse = isRemoveCourseModalOpen ? (
    <RemoveCoursePopupMessage
      checkIsRemoveModalOpen={checkIsRemoveModalOpen}
      handleConfirmationYes={handleConfirmationYes}
      handleConfirmationNo={handleConfirmationNo}
      handleCloseModalRemoveCourse={handleCloseModalRemoveCourse}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
      isRemoveCourseModalOpen={isRemoveCourseModalOpen}
      textMsg="Are you sure you want remove this course?"
    />
  ) : null;

  const validationMsgRemoveCourse = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <section>
      <div className="admin-content__list-courses list-courses">
        <h2 className="list-courses__title">Remove course</h2>
        {validationMsgRemoveCourse}
        <div className="list-courses__tabel">
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
        {popUpMsgAskRemoveCourse}
      </div>
    </section>
  );
};

export default RemoveCourse;
