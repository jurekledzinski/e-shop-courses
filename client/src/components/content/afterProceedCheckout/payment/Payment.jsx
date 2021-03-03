import React, { useEffect, useContext, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { StoreContext } from "../../../../store/StoreProvider";
import { CartContext } from "../../../../store/CartProvider";

import {
  downloadCustomerDetails,
  saveShippingDetails,
} from "../../../../utils/sessions";

import "./Payment.scss";

import PaymentForm from "./PaymentForm";
import PaymentShippingDetails from "./PaymentShippingDetails";
import AlertMessage from "../../../others/alertSuccessMessage/AlertMessage";
import ProcessBar from "../processBar/ProcessBar";

const Payment = ({ location }) => {
  const {
    adjustValidationMsg,
    checkCanGoPlaceOrder,
    customerDetails,
    setActiveLinePayment,
    setActiveLineStepCheckout,
    setCheckCanGoPlaceOrder,
    setCheckIsPaymentCheckout,
    setCheckIsPlaceOrderCheckout,
    setCheckIsShippingCheckout,
    setCheckerPayment,
    setCheckerPlaceOrder,
    setCustomerDetails,
    setDrawIcon,
    setNameCheckers,
    setErrorServerMsg,
    user,
    validationMsg,
  } = useContext(StoreContext);

  const { cart, totalPriceCart, totalQtyCart } = useContext(CartContext);

  const [choosePayment, setChoosePayment] = useState("paypal");

  const isSubscribe = useRef(false);
  const history = useHistory();

  const handleChangeRadioButtons = ({ target: { value } }) => {
    setChoosePayment(value);
    adjustValidationMsg("");
    setActiveLinePayment(false);
    setActiveLineStepCheckout("");
    setCheckIsPaymentCheckout(false);
    setCheckIsShippingCheckout(false);
    setCheckerPayment(false);

    setCheckIsPlaceOrderCheckout(false);
    setNameCheckers("");
    setDrawIcon(false);
    setCheckerPlaceOrder(false);
  };

  const createDeepCopy = (updatedCustomerDetails) => {
    let deepCopyCustomerDetails = [];

    updatedCustomerDetails.forEach((item) => {
      const singleCustomer = { ...item };
      deepCopyCustomerDetails = [...deepCopyCustomerDetails, singleCustomer];
    });

    return deepCopyCustomerDetails;
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    let copyCustomerOrder = createDeepCopy(customerDetails);

    const updatedCustomerDetails = copyCustomerOrder.map((item) => {
      return {
        ...item,
        cart: cart,
        paymentMethod: choosePayment,
        shippingPrice: 2,
        totalPriceCart: totalPriceCart,
        totalPriceOrder: totalPriceCart + 2,
        totalQtyCart: totalQtyCart,
      };
    });

    const pulledObject = updatedCustomerDetails.shift();

    const { data, status } = await saveShippingDetails(pulledObject);

    if (status === 200 && isSubscribe.current) {
      setCustomerDetails([pulledObject]);
      setCheckCanGoPlaceOrder(true);
      setCheckIsPaymentCheckout(true);
      setActiveLineStepCheckout("linePayment");
      history.push("/place-order");
    } else {
      adjustValidationMsg(data.alert);
      setErrorServerMsg(data);
    }
  };

  const fetchShippingDetails = async () => {
    const { data, status } = await downloadCustomerDetails(user.userId);

    if (status === 200 && isSubscribe.current) {
      setCustomerDetails([data]);
    } else {
      adjustValidationMsg(data.alert);
      setErrorServerMsg(data);
    }
  };

  useEffect(() => {
    if (Boolean(user)) {
      fetchShippingDetails();
    }
  }, [user]);

  useEffect(() => {
    isSubscribe.current = true;
    return () => (isSubscribe.current = false);
  }, []);

  const customerShippingDetails = Boolean(user)
    ? customerDetails.map((item) => (
        <PaymentShippingDetails key={item.userId} {...item} />
      ))
    : null;

  return (
    <section>
      <ProcessBar
        checkCanGoPlaceOrder={checkCanGoPlaceOrder}
        endpoint={location.pathname}
      />
      <div className="payment">
        <h1 className="payment__title">Payment method</h1>
        <AlertMessage validationMsg={validationMsg} />
        <div className="payment__method">
          <PaymentForm
            choosePayment={choosePayment}
            handleContinue={handleContinue}
            handleChangeRadioButtons={handleChangeRadioButtons}
          />
          {customerShippingDetails}
        </div>
      </div>
    </section>
  );
};
export default Payment;
