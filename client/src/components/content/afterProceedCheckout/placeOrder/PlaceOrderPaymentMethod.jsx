import React from "react";

import "./PlaceOrderPaymentMethod.scss";

const PlaceOrderPaymentMethod = () => {
  return (
    <div className="placeOrder__payment-method payment-method" id="payment">
      <h3 className="payment-method__title">2. Payment</h3>
      <div className="payment-method__details">
        <p className="payment-method__payment">Method: </p>
        <img
          className="payment-method__img"
          src="https://firebasestorage.googleapis.com/v0/b/products-courses.appspot.com/o/no-remove-paypal200.jpg?alt=media&token=8445e2fd-0067-45f2-96ee-141cd3f9d7c4"
          alt="paypal"
        />
      </div>
    </div>
  );
};

export default PlaceOrderPaymentMethod;
