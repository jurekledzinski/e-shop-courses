import React from "react";

import "./SummaryOrderPaid.scss";

const SummaryOrderPaid = ({
  paymentMethod,
  shippingPrice,
  totalPriceOrder,
}) => {
  return (
    <>
      <p className="paid-order__summery-payment summery-payment">
        Payment method:{" "}
        <span className="summery-payment__payment-method-span">
          {paymentMethod}
        </span>
      </p>
      <p className="summery-payment__shipping-price">
        Shipping price:{" "}
        <span className="summery-payment__shipping-price-span">
          {shippingPrice.toFixed(2)}€
        </span>
      </p>
      <p className="summery-payment__total-price">
        Total:{" "}
        <span className="summery-payment__total-price-span summery-payment__total-price-span--selected ">
          {totalPriceOrder.toFixed(2)}€
        </span>
      </p>
    </>
  );
};
export default SummaryOrderPaid;
