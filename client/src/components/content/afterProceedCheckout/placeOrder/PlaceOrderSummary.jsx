import React from "react";

import "./PlaceOrderSummary.scss";

const PlaceOrderSummary = ({
  shippingPrice,
  totalPriceCart,
  totalPriceOrder,
}) => {
  return (
    <div className="placeOrder__summary summary" id="summary">
      <h3 className="summary__title-summary">Summary</h3>
      <div className="summary__details-summary">
        <p className="summary__subtotal">
          Subtotal:{" "}
          <span className="summary__price">
            {parseInt(totalPriceCart) < 1000
              ? totalPriceCart.toFixed(2)
              : totalPriceCart}
            €
          </span>
        </p>
        <p className="summary__est-shipping">
          Estimated shipping:
          <span className="summary__est-price">
            {shippingPrice.toFixed(2)}€
          </span>
        </p>
        <p className="summary__total">
          Total:
          <span className="summary__total-price">
            {parseInt(totalPriceOrder) < 1000
              ? totalPriceOrder.toFixed(2)
              : totalPriceOrder}
            €
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlaceOrderSummary;
