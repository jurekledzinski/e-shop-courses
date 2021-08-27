import React from "react";

import "./OrderItems.scss";

import OrderItemsSingleProduct from "./OrderItemsSingleProduct";

const OrderItems = ({ cart }) => {
  const singleProduct = cart.map((item) => (
    <OrderItemsSingleProduct key={item._id} {...item} />
  ));

  return (
    <div
      className="order__order-itemsDetails order-itemsDetails"
      id="itemsOrder"
    >
      <h3 className="order-itemsDetails__title">Order items</h3>
      {singleProduct}
    </div>
  );
};

export default OrderItems;
