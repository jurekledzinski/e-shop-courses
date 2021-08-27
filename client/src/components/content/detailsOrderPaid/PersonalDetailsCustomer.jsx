import React from "react";

import "./PersonalDetailsCustomer.scss";

const PersonalDetailsCustomer = ({
  city,
  country,
  departmentState,
  name,
  numberStreet,
  postCode,
  street,
  surname,
}) => {
  return (
    <div className="paid-order__customer-details customer-details">
      <p className="customer-details__name-surname">
        {name} {surname}
      </p>
      <p className="customer-details__street-number">
        {street} {numberStreet}
      </p>
      <p className="customer-details__post-code-city">
        {city} {postCode}
      </p>
      <p className="customer-details__state-country">
        {departmentState} {country}
      </p>
    </div>
  );
};

export default PersonalDetailsCustomer;
