import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { StoreContext } from "../../../../store/StoreProvider";
import { CartContext } from "../../../../store/CartProvider";

import {
  downloadCustomerDetails,
  saveShippingDetails,
} from "../../../../utils/sessions";

import "./PlaceOrder.scss";

import ProcessBar from "../processBar/ProcessBar";
import PlaceOrderDetailsToShip from "./PlaceOrderDetailsToShip";
import PlaceOrderMethodShipForm from "./PlaceOrderMethodShipForm";
import PlaceOrderPaymentMethod from "./PlaceOrderPaymentMethod";
import PlaceOrderSummary from "./PlaceOrderSummary";
import PlaceOrderInCart from "./PlaceOrderInCart";

const PlaceOrder = ({ location }) => {
  const {
    checkCanGoPayment,
    checkCanGoPlaceOrder,
    setCheckerPayment,
    setCheckerPlaceOrder,
    setDrawIcon,
    customerDetails,
    setCheckIsPlaceOrderCheckout,
    setCustomerDetails,
    setErrorServerMsg,
    setNameCheckers,
    user,
  } = useContext(StoreContext);

  const { cart, totalPriceCart } = useContext(CartContext);

  const [chooseMethodShip, setChooseMethodShip] = useState("Standard");
  const [priceShip, setPriceShip] = useState(2);

  const timeOutClear = useRef(null);
  const isMounted = useRef(false);
  const history = useHistory();

  const createDeepCopyCustomerDetails = (updatedCustomerOrderDetails) => {
    let copyDeepCustomer = [];

    updatedCustomerOrderDetails.forEach((item) => {
      const singleOrderDetails = { ...item };
      copyDeepCustomer = [...copyDeepCustomer, singleOrderDetails];
    });

    return copyDeepCustomer;
  };

  const handleChangeRadioButtons = ({ target: { value } }) => {
    setChooseMethodShip(value);
    switch (value) {
      case "Standard":
        let priceStandard = 2;
        setPriceShip(priceStandard);
        break;
      case "TwoDays":
        let priceTwoDays = 4;
        setPriceShip(priceTwoDays);
        break;
      case "NextDay":
        let priceNextDay = 5;
        setPriceShip(priceNextDay);
        break;
      case "Outside Europe":
        let priceOutSideEurope = 14;
        setPriceShip(priceOutSideEurope);
        break;
    }

    setCheckIsPlaceOrderCheckout(false);
    setCheckerPlaceOrder(false);
    setDrawIcon(false);
    setNameCheckers("");
  };

  const handleSubmitPlaceOrder = async (e) => {
    e.preventDefault();

    let copyCustomerDataOrder = createDeepCopyCustomerDetails(customerDetails);

    const updatedOrderDetails = copyCustomerDataOrder.map((item) => {
      return {
        ...item,
        shipMethod: chooseMethodShip,
        shippingPrice: priceShip,
        totalPriceOrder: totalPriceCart + priceShip,
      };
    });

    const pulledObjectCustomerOrder = updatedOrderDetails.shift();

    const { data, status } = await saveShippingDetails(
      pulledObjectCustomerOrder
    );

    if (status === 200 && isMounted.current) {
      setCustomerDetails([pulledObjectCustomerOrder]);
      setCheckIsPlaceOrderCheckout(true);
      setNameCheckers("placeOrderChecker");
      setDrawIcon((prevValue) => !prevValue);
      window.scrollTo({ top: 0, behavior: "smooth" });

      if (isMounted.current) {
        timeOutClear.current = setTimeout(
          () => history.push(`/order/${user.userId}`),
          1700
        );
      }
    } else {
      setErrorServerMsg(data);
    }
  };

  const fetchDataCustomerDetails = async () => {
    const { data, status } = await downloadCustomerDetails(user.userId);
    if (status === 200 && isMounted.current) {
      setCustomerDetails([data]);
    } else {
      setErrorServerMsg(data);
    }
  };

  useEffect(() => {
    if (Boolean(user)) {
      fetchDataCustomerDetails();
    }
  }, [user]);

  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      timeOutClear.current = setTimeout(() => setCheckerPayment(true), 1200);
    }

    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    if (customerDetails.length > 0) {
      let copyOrderData = createDeepCopyCustomerDetails(customerDetails);

      const orderUpdatedPriceShip = copyOrderData.map((item) => {
        return {
          ...item,
          shippingPrice: priceShip,
          totalPriceOrder: totalPriceCart + priceShip,
        };
      });

      const pulledObjOrder = orderUpdatedPriceShip.shift();

      setCustomerDetails([pulledObjOrder]);
    }
  }, [priceShip]);

  useEffect(() => {
    return () => clearTimeout(timeOutClear.current);
  }, []);

  const ShippingCustomerDetails = customerDetails.map((item) => (
    <PlaceOrderDetailsToShip key={item._id} {...item} />
  ));

  const customerMethodPayment = customerDetails.map((item) => (
    <PlaceOrderPaymentMethod key={item._id} {...item} />
  ));

  const customerSummaryOrder = customerDetails.map((item) => (
    <PlaceOrderSummary key={item._id} {...item} />
  ));

  const customerInCart = cart.map((item) => (
    <PlaceOrderInCart key={item._id} {...item} />
  ));

  return (
    <section>
      <ProcessBar
        checkCanGoPayment={checkCanGoPayment}
        checkCanGoPlaceOrder={checkCanGoPlaceOrder}
        endpoint={location.pathname}
      />
      <div className="placeOrder">
        <div className="placeOrder__wrapper">
          <div className="placeOrder__info" id="info">
            <h3 className="placeOrder__title-info">
              Please check your information
            </h3>
          </div>
          {customerSummaryOrder}
          <div className="placeOrder__shipping" id="shipping">
            <h3 className="placeOrder__title-shipping">1. Shipping</h3>
            <div className="placeOrder__shipDetails-method">
              {ShippingCustomerDetails}
              <PlaceOrderMethodShipForm
                chooseMethodShip={chooseMethodShip}
                handleChangeRadioButtons={handleChangeRadioButtons}
              />
            </div>
          </div>
          <div className="placeOrder__inCart" id="cart">
            <h3 className="placeOrder__title-inCart">In your cart</h3>
            {customerInCart}
          </div>
          {customerMethodPayment}
          <div className="placeOrder__review" id="review">
            <h3 className="placeOrder__title-review">
              3. Review and submit your order
            </h3>
            <p className="placeOrder__terms">
              By cliking the "Place order" button, you confirm that you have
              read, understood and accept our{" "}
              <Link to="/terms-shop" className="placeOrder__link">
                Terms and conditions, return policy and privacy policy
              </Link>
            </p>
            <div className="placeOrder__review-button">
              <button
                className="placeOrder__review-btn"
                onClick={handleSubmitPlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
