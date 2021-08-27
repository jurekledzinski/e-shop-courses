import React, { useContext } from "react";

import { StoreContext } from "../../../../store/StoreProvider";

import "./Order.scss";

import OrderShipping from "./OrderShipping";
import OrderPayment from "./OrderPayment";
import OrderItems from "./OrderItems";
import OrderSummary from "./OrderSummary";

const Order = ({}) => {
  const { customerDetails } = useContext(StoreContext);

  const shippingCustomerDetails = customerDetails.map((item) => (
    <OrderShipping key={item._id} {...item} />
  ));

  const paymentCustomerDetails = customerDetails.map((item) => (
    <OrderPayment key={item._id} {...item} />
  ));

  const itemsCustomerDetails = customerDetails.map((item) => (
    <OrderItems key={item._id} {...item} />
  ));

  const summaryCustomerDetails = customerDetails.map((item) => (
    <OrderSummary key={item._id} {...item} customerDetails={customerDetails} />
  ));

  return (
    <section>
      <div className="order">
        <h2 className="order__title">Order review</h2>
        <div className="order__order-details">
          {shippingCustomerDetails}
          {paymentCustomerDetails}
          {itemsCustomerDetails}
          {summaryCustomerDetails}
        </div>
      </div>
    </section>
  );
};

export default Order;
