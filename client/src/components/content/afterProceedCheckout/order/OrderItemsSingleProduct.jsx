import React from "react";

import "./OrderItemsSingleProduct.scss";

const OrderItemsSingleProduct = ({
  imagePath,
  price,
  title,
  totalQtyProduct,
}) => {
  return (
    <div className="orderCard-product">
      <div className="orderCard-product__images">
        <img className="orderCard-product__img" src={imagePath} alt={title} />
      </div>
      <div className="orderCard-product__details">
        <p className="orderCard-product__name-product">{title}</p>
        <p className="orderCard-product__qty">Qty: {totalQtyProduct}</p>
        <p className="orderCard-product__price">Price: {price}</p>
      </div>
    </div>
  );
};

export default OrderItemsSingleProduct;
