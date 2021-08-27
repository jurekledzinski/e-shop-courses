import React from "react";

import "./OrderSummary.scss";

import PayButtonPaypal from "../payButtonPaypal/PayButtonPaypal";

const OrderSummary = ({
  cart,
  city,
  country,
  departmentState,
  name,
  numberStreet,
  postCode,
  shippingPrice,
  street,
  surname,
  totalPriceCart,
  totalPriceOrder,
  customerDetails,
}) => {
  const buttonPay = (
    <PayButtonPaypal
      cart={cart}
      city={city}
      country={country}
      departmentState={departmentState}
      name={name}
      numberStreet={numberStreet}
      postCode={postCode}
      shippingPrice={shippingPrice}
      street={street}
      surname={surname}
      totalPriceCart={totalPriceCart}
      totalPriceOrder={totalPriceOrder}
      customerDetails={customerDetails}
    />
  );

  return (
    <div
      className="order__order-summaryDetails order-summaryDetails"
      id="summaryOrder"
    >
      <h3 className="order-summaryDetails__title">Order summary </h3>
      <div className="order-summaryDetails__details">
        <p className="order-summaryDetails__subtotal">
          Items price:
          <span className="order-summaryDetails__subtotal-price">
            {parseInt(totalPriceCart) < 1000
              ? totalPriceCart.toFixed(2)
              : totalPriceCart}
            €
          </span>
        </p>
        <p className="order-summaryDetails__est-shipping">
          Estimated shipping:
          <span className="order-summaryDetails__ship-price">
            {shippingPrice.toFixed(2)}€
          </span>
        </p>
        <p className="order-summaryDetails__total">
          Total:{" "}
          <span className="order-summaryDetails__total-price">
            {parseInt(totalPriceOrder) < 1000
              ? totalPriceOrder.toFixed(2)
              : totalPriceOrder}
            €
          </span>
        </p>
        <div className="order-summaryDetails__payButtons">{buttonPay}</div>
      </div>
    </div>
  );
};

export default OrderSummary;
