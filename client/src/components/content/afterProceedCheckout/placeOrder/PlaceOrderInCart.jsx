import React from "react";

import "./PlaceOrderInCart.scss";

const PlaceOrderInCart = ({ imagePath, price, title, totalQtyProduct }) => {
  return (
    <div className="placeOrder__inCart-details inCart-details">
      <div className="inCart-details__image">
        <img src={imagePath} alt="" className="inCart-details__img" />
      </div>
      <div className="inCart-details__text">
        <p className="inCart-details__name-product">{title}</p>
        <p className="inCart-details__qty-product">Qty: {totalQtyProduct}</p>
        <p className="inCart-details__price-product">Price: {price}</p>
      </div>
    </div>
  );
};

export default PlaceOrderInCart;
