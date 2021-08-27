import React from "react";

import "./OrderPayment.scss";

const OrderPayment = ({ paymentMethod }) => {
  const showMetodPay =
    paymentMethod === "paypal" ? (
      <img
        className="order-paymentDetails__img"
        src="https://firebasestorage.googleapis.com/v0/b/products-courses.appspot.com/o/no-remove-paypal200.jpg?alt=media&token=8445e2fd-0067-45f2-96ee-141cd3f9d7c4"
        alt="paypal"
      />
    ) : null;

  return (
    <div
      className="order__order-paymentDetails order-paymentDetails"
      id="paymentOrder"
    >
      <h3 className="order-paymentDetails__title">Payment method</h3>
      <div className="order-paymentDetails__method-pay">
        <p className="order-paymentDetails__payment">Method: </p>
        {showMetodPay}
      </div>
    </div>
  );
};

export default OrderPayment;
