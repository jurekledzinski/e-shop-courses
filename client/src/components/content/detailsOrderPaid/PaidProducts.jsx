import React from "react";

import "./PaidProducts.scss";

const PaidProducts = ({ imagePath, price, title, totalQtyProduct }) => {
  return (
    <div className="paid-order__paid-product paid-product">
      <div className="paid-product__image">
        <img src={imagePath} alt={title} className="paid-product__img" />
      </div>
      <div className="paid-product__details">
        <p className="paid-product__title">{title}</p>
        <p className="paid-product__qty-product">
          Quantity:{" "}
          <span className="paid-product__qty-product-span">
            {totalQtyProduct}
          </span>
        </p>
        <p className="paid-product__price">
          Price:{" "}
          <span className="paid-product__price-span">{price.toFixed(2)}€</span>
        </p>
      </div>
    </div>
  );
};

export default PaidProducts;
