import React, { useContext, useMemo } from "react";
import { useHistory } from "react-router-dom";
import {
  useGlobalFilter,
  useTable,
  usePagination,
  useSortBy,
} from "react-table";

import { format } from "date-fns";

import { StoreContext } from "../../../../../../../store/StoreProvider";

import "./ManagementOrders.scss";

import ControlPrevNextPage from "../../tablesAdminDasboard/ControlPrevNextPage";
import GlobalFilter from "../../tablesAdminDasboard/GlobalFilter";
import TabelManagementOrders from "../../tablesAdminDasboard/TabelManagementOrders";

const ManagementOrders = () => {
  const { allPaidOrdersByUser, setFlag, setIdUser } = useContext(StoreContext);

  const history = useHistory();

  const columns = useMemo(
    () => [
      { Header: "Order ID", accessor: "orderId" },
      {
        Header: "Data Paid",
        accessor: "datePayed",
        Cell: ({ value }) => {
          return format(new Date(value), "dd/MM/yy");
        },
      },
      { Header: "Total", accessor: "totalPriceOrder" },
      {
        Header: "Shipped",
        accessor: "isShipped",
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
            className="management-orders__button-details-order"
            onClick={() => {
              setFlag((prevValue) => !prevValue);
              setIdUser(propsTable.row.original.userId);
              let orderID = propsTable.row.original.orderId.toLowerCase();
              history.push(`/details-order/${orderID}`);
            }}
          >
            Details order
          </button>
        ),
      },
    ],
    [allPaidOrdersByUser]
  );
  const data = useMemo(() => allPaidOrdersByUser, [allPaidOrdersByUser]);

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
      <div className="admin-content__management-orders management-orders">
        <h2 className="management-orders__title">Management orders</h2>
        <div className="management-orders__tabel">
          <GlobalFilter
            data={allPaidOrdersByUser}
            filter={globalFilter}
            setFilter={setGlobalFilter}
          />
          <TabelManagementOrders
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

export default ManagementOrders;
