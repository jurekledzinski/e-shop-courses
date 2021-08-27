import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { StoreContext } from "../../../../../../../store/StoreProvider";

import { removeAdvertSlider } from "../../../../../../../utils/sessions";

import "./RemoveAdvertsSlider.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TableAdvertsAdminDashboard from "../../tablesAdminDasboard/TableAdvertsAdminDashboard";

import RemoveCoursePopupMessage from "../warningPopupMessage/RemoveCoursePopupMessage";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

import useDeleteImage from "../../../../../../../customHooks/useDeleteImage";

const RemoveAdvertsSlider = () => {
  const {
    adjustValidationMsg,
    allAdvertsSlider,
    setAllAdvertsSlider,
    setErrorServerMsg,
    validationMsg,
  } = useContext(StoreContext);

  const [partClass, setpartClass] = useState("");
  const [isPossibleToCloseModalOnDiv] = useState(false);
  const [isRemoveCourseModalOpen, setIsRemoveCourseModalOpen] = useState(false);
  const [idRow, setIdrow] = useState("");
  const [urlRemoveInFireBase, seturlRemoveInFireBase] = useState("");

  const isMountedComp = useRef(null);

  const { deleteImageInFirebase } = useDeleteImage(urlRemoveInFireBase);

  const [
    checkIsModalRemoveAdvertsOpen,
    setCheckIsModalRemoveAdvertsOpen,
  ] = useState(false);

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
      { Header: "Description", accessor: "description" },
      {
        Header: "Delete",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (propsTable) => (
          <button
            className="list-adverts__btn-remove"
            onClick={() => {
              setCheckIsModalRemoveAdvertsOpen((prevValue) => !prevValue);
              seturlRemoveInFireBase(propsTable.row.original.imagePath);
              setIdrow(propsTable.row.original._id);
              setIsRemoveCourseModalOpen(true);
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        ),
      },
    ],
    [allAdvertsSlider]
  );
  const data = useMemo(() => allAdvertsSlider, [allAdvertsSlider]);

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

  const deleteAdvert = async () => {
    const { data, status } = await removeAdvertSlider(idRow);

    setpartClass(Object.keys(data)[0]);

    if (status === 200 && isMountedComp.current) {
      let advertCopy = [...allAdvertsSlider];
      let newAdvertAfterDelete = advertCopy.filter(
        (item) => item._id !== idRow
      );
      setAllAdvertsSlider(newAdvertAfterDelete);
      showAndHideMsgValidate(data.success);
      setIdrow("");

      deleteImageInFirebase();
    } else {
      setIdrow("");
      setErrorServerMsg(data);
      showAndHideMsgValidate(data.alert);
    }
  };

  const handleCloseModalRemoveCourse = () => {
    setIsRemoveCourseModalOpen(false);
    setIdrow("");
  };

  const handleConfirmationYes = () => {
    deleteAdvert();
  };

  const handleConfirmationNo = () => {
    setIdrow("");
  };

  useEffect(() => {
    isMountedComp.current = true;
    return () => {
      isMountedComp.current = false;
    };
  }, []);

  const msgPopUpAskToRemoveAdvert = isRemoveCourseModalOpen ? (
    <RemoveCoursePopupMessage
      checkIsRemoveModalOpen={checkIsModalRemoveAdvertsOpen}
      handleConfirmationYes={handleConfirmationYes}
      handleConfirmationNo={handleConfirmationNo}
      handleCloseModalRemoveCourse={handleCloseModalRemoveCourse}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
      isRemoveCourseModalOpen={isRemoveCourseModalOpen}
      textMsg="Are you sure you want remove this advert?"
    />
  ) : null;

  const validationMsgRemoveAdvert = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <section>
      <div className="admin-content__list-adverts list-adverts">
        <h2 className="list-adverts__title">Remove advert</h2>
        {validationMsgRemoveAdvert}
        <div className="list-adverts__tabel">
          <GlobalFilter
            data={allAdvertsSlider}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
          <TableAdvertsAdminDashboard
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
        {msgPopUpAskToRemoveAdvert}
      </div>
    </section>
  );
};

export default RemoveAdvertsSlider;
