import React from "react";

import "./PlaceOrderMethodShipForm.scss";

const PlaceOrderMethodShipForm = ({
  chooseMethodShip,
  handleChangeRadioButtons,
}) => {
  const adjustDate = (value) => {
    let date = new Date();

    switch (value) {
      case "standard":
        let standardDate = new Date(
          date.getTime() + 1000 * 60 * 60 * 24 * 4
        ).toLocaleDateString();
        return standardDate.slice(0, 10).replace(".", "/").replace(".", "/");
        break;
      case "twoDays":
        let twoDaysDate = new Date(
          date.getTime() + 1000 * 60 * 60 * 24 * 2
        ).toLocaleDateString();
        return twoDaysDate.slice(0, 10).replace(".", "/").replace(".", "/");
        break;
      case "nextDay":
        let nextDayDate = new Date(
          date.getTime() + 1000 * 60 * 60 * 24 * 1
        ).toLocaleDateString();
        return nextDayDate.slice(0, 10).replace(".", "/").replace(".", "/");
        break;
    }
  };

  return (
    <div className="placeOrder__details-shipMethod details-shipMethod">
      <h4 className="details-shipMethod__title">Select shipping methods:</h4>
      <form className="details-shipMethod__options-ship">
        <div className="details-shipMethod__wrap-label-input">
          <label htmlFor="standard" className="details-shipMethod__label">
            <input
              type="radio"
              name="shipMethod"
              id="standard"
              value="Standard"
              onChange={handleChangeRadioButtons}
              checked={chooseMethodShip === "Standard"}
              className="details-shipMethod__input"
            />
            Standard ({adjustDate("standard")}) 2.00€
          </label>
        </div>
        <div className="details-shipMethod__wrap-label-input">
          <label htmlFor="twoDays" className="details-shipMethod__label">
            <input
              type="radio"
              name="shipMethod"
              id="twoDays"
              value="TwoDays"
              onChange={handleChangeRadioButtons}
              checked={chooseMethodShip === "TwoDays"}
              className="details-shipMethod__input"
            />
            Two days ({adjustDate("twoDays")}) 4.00€
          </label>
        </div>
        <div className="details-shipMethod__wrap-label-input">
          <label htmlFor="nextDay" className="details-shipMethod__label">
            <input
              type="radio"
              name="shipMethod"
              id="nextDay"
              value="NextDay"
              onChange={handleChangeRadioButtons}
              checked={chooseMethodShip === "NextDay"}
              className="details-shipMethod__input"
            />
            Next day ({adjustDate("nextDay")}) 5.00€
          </label>
        </div>
        <div className="details-shipMethod__wrap-label-input">
          <label htmlFor="outSideEurope" className="details-shipMethod__label">
            <input
              type="radio"
              name="shipMethod"
              id="outSideEurope"
              value="Outside Europe"
              onChange={handleChangeRadioButtons}
              checked={chooseMethodShip === "Outside Europe"}
              className="details-shipMethod__input"
            />
            Outside Europe (Est. time arrives 10-21 days) 14.00€
          </label>
        </div>
      </form>
      <p className="details-shipMethod__reminder">
        Orders placed after 5 p.m. begin processing next business day.
      </p>
    </div>
  );
};

export default PlaceOrderMethodShipForm;
