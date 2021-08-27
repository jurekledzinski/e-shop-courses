import React, { useContext } from "react";

import "./PlaceOrderMethodShipForm.scss";

import { NavContext } from "../../../../store/NavProvider";

const PlaceOrderMethodShipForm = ({
  chooseMethodShip,
  handleChangeRadioButtons,
}) => {
  const { checkWidthWindow500 } = useContext(NavContext);
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
            Standard ({adjustDate("standard")}){" "}
            <span className="details-shipMethod__price">2.00€</span>
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
            Two days ({adjustDate("twoDays")}){" "}
            <span className="details-shipMethod__price">4.00€</span>
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
            Next day ({adjustDate("nextDay")}){" "}
            <span className="details-shipMethod__price">5.00€</span>
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
            Outside Europe{" "}
            {checkWidthWindow500 ? (
              <span className="details-shipMethod__price">14.00€</span>
            ) : null}
          </label>
          <p className="details-shipMethod__estimated-time">
            (Est. time arrives 10-21 days){" "}
            {checkWidthWindow500 ? null : (
              <span className="details-shipMethod__price">14.00€</span>
            )}
          </p>
        </div>
      </form>
      <p className="details-shipMethod__reminder">
        Orders placed after 5 p.m. begin processing next business day.
      </p>
    </div>
  );
};

export default PlaceOrderMethodShipForm;
