import React from "react";

import "./PaymentForm.scss";

const PaymentForm = ({
  choosePayment,
  handleContinue,
  handleChangeRadioButtons,
}) => {
  return (
    <form
      className="payment__payment-options payment-options"
      onSubmit={handleContinue}
    >
      <p className="payment-options__title">Please choose your method:</p>
      <div className="payment-options__wrapper-details">
        <label htmlFor="paypal" className="payment-options__label">
          <input
            type="radio"
            name="paymethod"
            id="paypal"
            className="payment-options__input"
            value="paypal"
            onChange={handleChangeRadioButtons}
            checked={choosePayment === "paypal"}
          />
          <img
            className="payment-options__img"
            src="https://firebasestorage.googleapis.com/v0/b/products-courses.appspot.com/o/no-remove-paypal200.jpg?alt=media&token=8445e2fd-0067-45f2-96ee-141cd3f9d7c4"
            alt="paypal"
          />
        </label>
      </div>
      <button className="payment-options__button">Continue</button>
    </form>
  );
};

export default PaymentForm;
