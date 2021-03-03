import React from "react";

import "./ShippingDetailsOrderPaid.scss";

const ShippingDetailsOrderPaid = ({
  dateDelivery,
  datePayed,
  dateShipping,
  isAdmin,
  isDelivered,
  idOrder,
  isPayed,
  isShipped,
  handleChangeToDelivered,
  handleChangeToShipped,
  history,
  shipMethod,
}) => {
  const pagePath = history.location.pathname;
  const pathConfirm = `/details-order/${idOrder.toLowerCase()}`;

  return (
    <div className="paid-order__details-order details-order">
      <p className="details-order__date-paid">
        Date order:{" "}
        <span className="details-order__date-paid-thin">{datePayed}</span>
      </p>
      <p className="details-order__is-paid">
        Order paid:{" "}
        {isPayed ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </p>
      <p className="details-order__is-shipped">
        Order shipped:{" "}
        {isShipped ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </p>
      {isShipped ? (
        <p className="details-order__shipped-date">
          Order shipping date:{" "}
          <span className="details-order__shipped-date-thin">
            {dateShipping}
          </span>
        </p>
      ) : isAdmin && pagePath === pathConfirm ? (
        <button
          className="details-order__btn-change-shipped"
          onClick={handleChangeToShipped}
        >
          Change to shipped
        </button>
      ) : null}
      <p className="details-order__is-delivered">
        Order delivered:{" "}
        {isDelivered ? (
          <i className="fas fa-check"></i>
        ) : (
          <i className="fas fa-times"></i>
        )}
      </p>
      {isDelivered ? (
        <p className="details-order__delivered-date">
          Order delivered date:{" "}
          <span className="details-order__delivered-date-thin">
            {dateDelivery}
          </span>
        </p>
      ) : isAdmin && pagePath === pathConfirm ? (
        <button
          className="details-order__btn-change-delivered"
          onClick={handleChangeToDelivered}
        >
          Change to delivered
        </button>
      ) : null}
      <p className="details-order__shipping-method">
        Shipping method:{" "}
        <span className="details-order__shipping-method-thin">
          {shipMethod}
        </span>
      </p>
    </div>
  );
};

export default ShippingDetailsOrderPaid;
