import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { StoreContext } from "../../../../../../../store/StoreProvider";

import {
  deleteCartFromMongo,
  removeCustomerPaidOrder,
  removeUser,
} from "../../../../../../../utils/sessions";

import { Role } from "../../../../../../../helpers/roles";

import "./ListUsers.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TableUsersAdminDashboard from "../../tablesAdminDasboard/TableUsersAdminDashboard";

import RemoveUserPopupMessage from "../warningPopupMessage/RemoveUserPopupMessage";
import ReturnMsgAlertSuccess from "../../../../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const ListUsers = () => {
  const {
    allBoughtCoursesByUser,
    adjustValidationMsg,
    allPaidOrdersByUser,
    allUsers,
    setAllUsers,
    setAllBoughtCoursesByUser,
    setAllPaidOrdersByUser,
    setErrorServerMsg,
    validationMsg,
  } = useContext(StoreContext);

  const [checkIsRemoveUserModalOpen, setCheckIsRemoveUserModalOpen] = useState(
    false
  );
  const [partClass, setpartClass] = useState("");
  const [isPossibleToCloseModalOnDiv] = useState(false);
  const [isRemoveUserModalOpen, setIsRemoveUserModalOpen] = useState(false);
  const [idUser, setIdUser] = useState("");

  const isMounted = useRef();

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
      { Header: "Username", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      {
        Header: "Delete",
        disableSortBy: true,
        id: "delete",
        accessor: (str) => "delete",
        Cell: (propsTable) => (
          <button
            className="list-users__btn-remove"
            onClick={() => {
              setIdUser(propsTable.row.original._id);
              setIsRemoveUserModalOpen(true);
              setCheckIsRemoveUserModalOpen((prevValue) => !prevValue);
            }}
            disabled={propsTable.row.original.role === "Admin" ? true : false}
          >
            {propsTable.row.original.role === Role.Admin ? (
              <i className="far fa-minus-square"></i>
            ) : (
              <i className="fas fa-times"></i>
            )}
          </button>
        ),
      },
    ],
    [allUsers]
  );
  const data = useMemo(() => allUsers, [allUsers]);

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

  const copyPaidOrdersAndCourses = () => {
    let copyPaidOrders = [];
    let copyUserCourses = [];

    allPaidOrdersByUser.forEach((item) => {
      const singleItem = { ...item };
      copyPaidOrders = [...copyPaidOrders, singleItem];
    });

    allBoughtCoursesByUser.forEach((item) => {
      const singleItem = { ...item };
      copyUserCourses = [...copyUserCourses, singleItem];
    });

    return { copyPaidOrders, copyUserCourses };
  };

  const deleteUser = async () => {
    const { data, status } = await removeUser(idUser);

    setpartClass(Object.keys(data)[0]);
    if (status === 200 && isMounted.current) {
      let usersCopy = [...allUsers];
      let newUsersAfterDelete = usersCopy.filter((user) => user._id !== idUser);
      setAllUsers(newUsersAfterDelete);
      showAndHideMsgValidate(data.success);
      await deleteCartFromMongo(idUser);
      await removeCustomerPaidOrder(idUser);
      const { copyPaidOrders, copyUserCourses } = copyPaidOrdersAndCourses();

      let updatedPaidOrders = copyPaidOrders.filter(
        (item) => item.userId !== idUser
      );

      setAllPaidOrdersByUser(updatedPaidOrders);

      let updatedUserCourses = copyUserCourses.filter(
        (item) => item.userId !== idUser
      );

      setAllBoughtCoursesByUser(updatedUserCourses);
    } else {
      showAndHideMsgValidate(data.alert);
      setErrorServerMsg(data);
    }
  };

  const handleConfirmationYes = () => {
    deleteUser();
  };

  const handleConfirmationNo = () => {
    setIdUser("");
  };

  const handleCloseModalRemoveUser = () => {
    setIsRemoveUserModalOpen(false);
    setIdUser("");
  };

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const popupWarningMessage = isRemoveUserModalOpen ? (
    <RemoveUserPopupMessage
      checkIsRemoveModalOpen={checkIsRemoveUserModalOpen}
      handleCloseModalRemoveUser={handleCloseModalRemoveUser}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
      isRemoveUserModalOpen={isRemoveUserModalOpen}
      handleConfirmationYes={handleConfirmationYes}
      handleConfirmationNo={handleConfirmationNo}
      textMsg="Are you sure you want remove this user?"
    />
  ) : null;

  const confirmMessage = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <section>
      <div className="admin-content__list-users list-users">
        <h2 className="list-users__title">List users</h2>
        {confirmMessage}
        <div className="list-users__tabel">
          <GlobalFilter
            data={allUsers}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
          <TableUsersAdminDashboard
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
        {popupWarningMessage}
      </div>
    </section>
  );
};

export default ListUsers;
