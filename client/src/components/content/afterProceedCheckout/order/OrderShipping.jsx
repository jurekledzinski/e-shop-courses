import React from "react";

import "./OrderShipping.scss";

const OrderShipping = ({
  city,
  country,
  departmentState,
  email,
  name,
  numberStreet,
  phone,
  postCode,
  shipMethod,
  street,
  surname,
}) => {
  return (
    <div
      className="order__order-shippingDetails order-shippingDetails"
      id="shippingOrder"
    >
      <h3 className="order-shippingDetails__title">Shipping Details</h3>
      <h4 className="order-shippingDetails__title-delivery-address">
        Delivery address:
      </h4>
      <ul className="order-shippingDetails__list">
        <li className="order-shippingDetails__item">
          {name} {surname}
        </li>
        <li className="order-shippingDetails__item">
          {street} {numberStreet}
        </li>
        <li className="order-shippingDetails__item">
          {postCode} {city}
        </li>
        <li className="order-shippingDetails__item">
          {departmentState} {country}
        </li>
        <li className="order-shippingDetails__item">{phone}</li>
        <li className="order-shippingDetails__item">{email}</li>
      </ul>
      <h4 className="order-shippingDetails__title-delivery">
        Delivery method:
      </h4>
      <p className="order-shippingDetails__delivery-method">{shipMethod}</p>
    </div>
  );
};

export default OrderShipping;
