import React from "react";

import "./PaymentShippingDetails.scss";

const PaymentShippingData = ({
  city,
  country,
  departmentState,
  name,
  numberStreet,
  phone,
  postCode,
  surname,
  street,
}) => {
  return (
    <div className="payment__shipping-data shipping-data">
      <h4 className="shipping-data__title">Your shipping details:</h4>
      <ul className="shipping-data__list-details">
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Name: </span>
          {name}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Surname: </span>
          {surname}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Address: </span>
          {street}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Street number: </span>
          {numberStreet}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">State: </span>
          {departmentState}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Post code: </span>
          {postCode}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">City: </span>
          {city}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Country: </span>
          {country}
        </li>
        <li className="shipping-data__item">
          <span className="shipping-data__item-span">Phone: </span>
          {phone}
        </li>
      </ul>
    </div>
  );
};

export default PaymentShippingData;
