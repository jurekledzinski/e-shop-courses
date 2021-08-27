import React, { useEffect, useMemo, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { format } from "date-fns";

import "./Profile.scss";

import { Role } from "../../../../helpers/roles";

import { updateProfileUserData } from "../../../../utils/sessions";

import FormProfileUpdate from "./FormProfileUpdate";

import ControlPrevNextPage from "../../adminpage/insideAdminPage/adminDashboard/tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../adminpage/insideAdminPage/adminDashboard/tablesAdminDasboard/GlobalFilter";
import TableUserOrders from "../tableUserOrders/TableUserOrders";
import ReturnMsgAlertSuccess from "../../../others/returnMsgAlertSuccess/ReturnMsgAlertSuccess";

const Profile = ({
  adjustValidationMsg,
  orderPaidByCustomers,
  user,
  validationMsg,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [partClass, setpartClass] = useState("");
  const [username, setUserName] = useState("");

  const isMounted = useRef(false);
  const timeOut = useRef(null);
  const history = useHistory();

  const handleChangeUsername = ({ target: { value } }) => {
    setUserName(value);
  };
  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };
  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
  };
  const handleChangeConfirmPassword = ({ target: { value } }) => {
    setConfirmPassword(value);
  };

  const columns = useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId", id: "orderId" },
      {
        Header: "Data Paid",
        accessor: "datePayed",
        id: "datapaid",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yy");
        },
      },
      { Header: "Total", accessor: "totalPriceOrder", id: "totalPrice" },
      {
        Header: "Shipped",
        accessor: "isShipped",
        id: "shipped",
        Cell: (propsTable) => {
          return propsTable.row.original.isShipped ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times"></i>
          );
        },
      },
      {
        Header: "Delivered",
        accessor: "isDelivered",
        id: "delivered",
        Cell: (propsTable) => {
          return propsTable.row.original.isDelivered ? (
            <i className="fas fa-check"></i>
          ) : (
            <i className="fas fa-times"></i>
          );
        },
      },
      {
        Header: "Details",
        disableSortBy: true,
        id: "details",
        accessor: (str) => "details",
        Cell: (propsTable) => (
          <button
            className="profile-wrapper__button-profile"
            onClick={() => {
              let orderID = propsTable.row.original.orderId.toLowerCase();
              if (Boolean(user)) {
                history.push(
                  user.role === Role.Admin
                    ? `/admin-details-order/${orderID}`
                    : `/details-order/${orderID}`
                );
              }
            }}
          >
            Details order
          </button>
        ),
      },
    ],
    [orderPaidByCustomers]
  );
  const data = useMemo(() => orderPaidByCustomers, [orderPaidByCustomers]);

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

  const showCheckMessageupdate = (msg) => {
    if (msg) {
      adjustValidationMsg(msg);
      timeOut.current =
        isMounted.current &&
        setTimeout(() => {
          adjustValidationMsg("");
        }, 1500);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      userId: user.userId,
    };

    const { data, status } = await updateProfileUserData(updatedUser);

    setpartClass(Object.keys(data)[0]);

    if (status === 200 && isMounted.current) {
      showCheckMessageupdate(data.success);
    } else {
      showCheckMessageupdate(data.alert);
    }
  };

  useEffect(() => {
    if (Boolean(user)) {
      setUserName(user.user);
      setEmail(user.email);
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    return () => clearTimeout(timeOut.current);
  }, []);

  const validateMessageProfile = validationMsg ? (
    <ReturnMsgAlertSuccess partClass={partClass} msg={validationMsg} />
  ) : null;

  return (
    <section>
      <div className="profile-wrapper">
        <div className="profile-wrapper__columns">
          <div className="profile-wrapper__left-col">
            <h2 className="profile-wrapper__title">User profile</h2>
            {validateMessageProfile}
            <FormProfileUpdate
              confirmPassword={confirmPassword}
              email={email}
              handleChangeConfirmPassword={handleChangeConfirmPassword}
              handleChangeEmail={handleChangeEmail}
              handleChangePassword={handleChangePassword}
              handleChangeUsername={handleChangeUsername}
              handleUpdateProfile={handleUpdateProfile}
              password={password}
              username={username}
            />
          </div>
          <div className="profile-wrapper__right-col">
            <h2 className="profile-wrapper__title">My orders</h2>
            <div className="profile-wrapper__profile-order">
              <GlobalFilter
                data={orderPaidByCustomers}
                filter={globalFilter}
                setFilter={setGlobalFilter}
              />
              <TableUserOrders
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
        </div>
      </div>
    </section>
  );
};

export default Profile;
