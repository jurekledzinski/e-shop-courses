import React from "react";
import "./PlaceOrderDetailsToShip.scss";

const PlaceOrderDetailsToShip = ({
  city,
  country,
  departmentState,
  name,
  numberStreet,
  phone,
  postCode,
  street,
  surname,
}) => {
  return (
    <div className="placeOrder__details-shipping details-shipping">
      <ul className="details-shipping__address">
        <li className="details-shipping__person-detail">
          {name} {surname}
        </li>
        <li className="details-shipping__person-detail">
          {street} {numberStreet}
        </li>
        <li className="details-shipping__person-detail">
          {postCode} {city}
        </li>
        <li className="details-shipping__person-detail">
          {departmentState} {country}
        </li>
        <li className="details-shipping__person-detail">{phone}</li>
      </ul>
    </div>
  );
};

export default PlaceOrderDetailsToShip;
