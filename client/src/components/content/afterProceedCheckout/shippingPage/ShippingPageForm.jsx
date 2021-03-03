import React from "react";

import "./ShippingPageForm.scss";

import AlertMessage from "../../../others/alertSuccessMessage/AlertMessage";

const ShippingPageForm = ({
  cityValue,
  countryValue,
  handleOnChange,
  handleShippingForm,
  nameValue,
  phoneValue,
  postCodeValue,
  surnameValue,
  streetNameValue,
  streetNumberValue,
  stateDepartmentValue,
  validationMsg,
  user,
}) => {
  const toolTipCountryText =
    "Paypal use two-character IS0-3166-1 country codes like: NL - Netherlands, GB - Great Britain,C2 - China, PL - Poland etc. please when you are going to pay by paypal use this two-character code for each country.";

  const toolTipStateText =
    "If you choose pay by paypal, it only accept format postal delivery. For each country for exmaple: CA and not California. Value by country is: UK. A county, US. A state,Canada. A province,Japan. A prefecture,Switzerland. A kanton.";

  return (
    <form
      className="shipping__form-shipping form-shipping"
      onSubmit={handleShippingForm}
    >
      {Boolean(user) && <AlertMessage validationMsg={validationMsg} />}
      <div className="form-shipping__names">
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="customerName"
            placeholder="Name"
            className="form-shipping__input"
            value={nameValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            Name
          </label>
        </div>
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="customerSurname"
            placeholder="Surname"
            className="form-shipping__input"
            value={surnameValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            Surname
          </label>
        </div>
      </div>
      <div className="form-shipping__street-number">
        <div className="form-shipping__wrapper-details-1">
          <input
            type="text"
            name="streetCustomer"
            placeholder="Street"
            className="form-shipping__input"
            value={streetNameValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            Street
          </label>
        </div>
        <div className="form-shipping__wrapper-details-2">
          <input
            type="number"
            min="1"
            name="streetNumber"
            placeholder="Number"
            className="form-shipping__input"
            value={streetNumberValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            Number
          </label>
        </div>
      </div>
      <div className="form-shipping__state-post-code">
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="stateDepartment"
            placeholder="State"
            className="form-shipping__input"
            value={stateDepartmentValue}
            onChange={handleOnChange}
            required
          />
          <span className="form-shipping__tooltip">{toolTipStateText}</span>
          <label htmlFor="" className="form-shipping__label">
            State
          </label>
        </div>
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="code"
            placeholder="Post code"
            className="form-shipping__input"
            value={postCodeValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            Post Code
          </label>
        </div>
      </div>
      <div className="form-shipping__city-country">
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="cityCustomer"
            placeholder="City"
            className="form-shipping__input"
            value={cityValue}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="" className="form-shipping__label">
            City
          </label>
        </div>
        <div className="form-shipping__wrapper-details">
          <input
            type="text"
            name="countryCustomer"
            placeholder="Country"
            className="form-shipping__input"
            value={countryValue}
            onChange={handleOnChange}
            required
          />
          <span className="form-shipping__tooltip">{toolTipCountryText}</span>
          <label htmlFor="" className="form-shipping__label">
            Country
          </label>
        </div>
      </div>
      <div className="form-shipping__wrapper-details">
        <input
          min="0"
          type="number"
          name="customerPhone"
          placeholder="Phone number"
          className="form-shipping__input"
          value={phoneValue}
          onChange={handleOnChange}
          required
        />
        <label htmlFor="" className="form-shipping__label">
          Phone number
        </label>
      </div>
      <button className="form-shipping__button">Continue</button>
    </form>
  );
};

export default ShippingPageForm;
