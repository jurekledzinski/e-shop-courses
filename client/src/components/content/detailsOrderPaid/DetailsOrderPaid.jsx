import React, { useContext } from "react";

import "./detailsOrderPaid.scss";

import { StoreContext } from "../../../store/StoreProvider";

import { updadeCustomerPaidOrder } from "../../../utils/sessions";

import ShippingDetailsOrderPaid from "./ShippingDetailsOrderPaid";
import PersonalDetailsCustomer from "./PersonalDetailsCustomer";
import PaidProducts from "./PaidProducts";
import SummaryOrderPaid from "./SummaryOrderPaid";
import ButtonGoBack from "../../others/buttonGoBack/ButtonGoBack";

const DetailsOrderPaid = ({
  allPaidOrdersByUser,
  dataOrder,
  history,
  isAdmin,
  idOrder,
  setAdminPaidOrders,
  setAllPaidOrdersByUser,
  setPaidOrderDetails,
  user,
}) => {
  const { setErrorServerMsg } = useContext(StoreContext);

  const dateDeliverOrShip = new Date()
    .toISOString()
    .slice(0, 10)
    .split("-")
    .reverse()
    .join("-");

  const createDeepCopyPaidOrders = () => {
    let deepCopyPaidOrders = [];

    dataOrder.forEach((item) => {
      const singleOrder = { ...item };
      deepCopyPaidOrders = [...deepCopyPaidOrders, singleOrder];
    });

    return deepCopyPaidOrders;
  };

  let copyPaidOrders = createDeepCopyPaidOrders();

  let singlePaidOrder = copyPaidOrders.filter(
    (item) => item.orderId === idOrder
  );

  let cartFromPaidOrder = singlePaidOrder.map((item) => {
    return item.cart;
  });

  let [boughtProducts] = cartFromPaidOrder;

  const productsOrdered =
    Boolean(boughtProducts) &&
    boughtProducts.map((item) => <PaidProducts key={item._id} {...item} />);

  const handleChangeToDelivered = async () => {
    let updatedDeliver = copyPaidOrders.map((item) => {
      if (item.orderId === idOrder) {
        return {
          ...item,
          isDelivered: true,
          dateDelivery: dateDeliverOrShip,
        };
      }
      return item;
    });

    setPaidOrderDetails(updatedDeliver);

    let updatedOrderDeliver = updatedDeliver.find(
      (item) => item.orderId === idOrder
    );

    if (updatedOrderDeliver.userId === user.userId) {
      setAdminPaidOrders(updatedDeliver);
    }

    let allUsersOrdersPaid = allPaidOrdersByUser.map((item) => {
      if (item.orderId === idOrder) {
        return {
          ...item,
          isDelivered: true,
          dateDelivery: dateDeliverOrShip,
        };
      }
      return item;
    });

    setAllPaidOrdersByUser(allUsersOrdersPaid);

    const { data, status } = await updadeCustomerPaidOrder(updatedOrderDeliver);

    status !== 200 ? setErrorServerMsg(data) : null;
  };

  const handleChangeToShipped = async () => {
    let updatedShipping = copyPaidOrders.map((item) => {
      if (item.orderId === idOrder) {
        return {
          ...item,
          isShipped: true,
          dateShipping: dateDeliverOrShip,
        };
      }
      return item;
    });

    setPaidOrderDetails(updatedShipping);

    let updateShipped = updatedShipping.find(
      (item) => item.orderId === idOrder
    );

    if (updateShipped.userId === user.userId) {
      setAdminPaidOrders(updatedShipping);
    }

    let allOrdersPaid = allPaidOrdersByUser.map((item) => {
      if (item.orderId === idOrder) {
        return {
          ...item,
          isShipped: true,
          dateShipping: dateDeliverOrShip,
        };
      }
      return item;
    });

    setAllPaidOrdersByUser(allOrdersPaid);

    const { data, status } = await updadeCustomerPaidOrder(updateShipped);

    status !== 200 ? setErrorServerMsg(data) : null;
  };

  const shipDetailsOrder = singlePaidOrder.map((item) => (
    <ShippingDetailsOrderPaid
      key={item._id}
      {...item}
      handleChangeToDelivered={handleChangeToDelivered}
      handleChangeToShipped={handleChangeToShipped}
      history={history}
      isAdmin={isAdmin}
      idOrder={idOrder}
    />
  ));

  const customerDetails = singlePaidOrder.map((item) => (
    <PersonalDetailsCustomer key={item._id} {...item} />
  ));

  const orderSumary = singlePaidOrder.map((item) => (
    <SummaryOrderPaid key={item._id} {...item} />
  ));

  return (
    <section>
      <div className="paid-order">
        <ButtonGoBack history={history} />
        <div className="paid-order__wrapper">
          <div className="paid-order__left-col">
            <h2 className="paid-order__title">
              Order ID: <span className="paid-order__id-order">{idOrder}</span>
            </h2>
            <h3 className="paid-order__shipping-details-title">
              Order details status
            </h3>
            {shipDetailsOrder}
            <h3 className="paid-order__shipping-address-title">
              Shipping address
            </h3>
            {customerDetails}
            <h3 className="paid-order__summary-title">Order summary</h3>
            {orderSumary}
          </div>
          <div className="paid-order__right-col">
            <h3 className="paid-order__products">Products in order</h3>
            {productsOrdered}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsOrderPaid;
