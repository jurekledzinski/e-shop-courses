import React, {
  useEffect,
  Fragment,
  useContext,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import "./ProcessBar.scss";

import { StoreContext } from "../../../../store/StoreProvider";

import TickIcon from "../../../others/tickIcon/TickIcon";

const ProcessBar = ({ checkCanGoPayment, checkCanGoPlaceOrder, endpoint }) => {
  const {
    activeLineStepCheckout,
    activeLineSignIn,
    activeLineShipping,
    activeLinePayment,
    checkIsPaymentCheckout,
    checkerPayment,
    checkIsPlaceOrderCheckout,
    checkIsShippingCheckout,
    checkerShip,
    checkIsSignIn,
    checkerPlaceOrder,
    drawIcon,
    nameCheckers,
    setActiveLinePayment,
    setActiveLineShipping,
    setActiveLineSignIn,
    setActiveLineStepCheckout,
    setCheckerPlaceOrder,
    setNameCheckers,
    user,
    setCheckerShip,
  } = useContext(StoreContext);

  const [isInActive, setInIsActive] = useState(true);

  const timeClean = useRef(null);
  const cleanTimeOutChecker = useRef(null);

  const isLogIn = Boolean(user) ? true : false;

  useEffect(() => {
    switch (activeLineStepCheckout) {
      case "lineSignIn":
        timeClean.current = setTimeout(() => {
          setActiveLineStepCheckout("");
          setActiveLineSignIn(true);
        }, 330);
        break;
      case "lineShipping":
        timeClean.current = setTimeout(() => {
          setActiveLineStepCheckout("");
          setActiveLineShipping(true);
        }, 300);
        break;
      case "linePayment":
        timeClean.current = setTimeout(() => {
          setActiveLineStepCheckout("");
          setActiveLinePayment(true);
        }, 300);
        break;
      default:
        break;
    }

    return () => clearTimeout(timeClean.current);
  }, [activeLineStepCheckout, activeLineSignIn]);

  useEffect(() => {
    switch (nameCheckers) {
      case "shippingChecker":
        cleanTimeOutChecker.current = setTimeout(() => {
          setNameCheckers("");
          setCheckerShip(true);
        }, 350);
        break;
      case "placeOrderChecker":
        cleanTimeOutChecker.current = setTimeout(() => {
          setNameCheckers("");
          setCheckerPlaceOrder(true);
        }, 1500);
        break;
      default:
        break;
    }

    return () => clearTimeout(cleanTimeOutChecker.current);
  }, [nameCheckers, checkerShip]);

  return (
    <div className="process-bar">
      <div className="process-bar__wrapper">
        <div className="process-bar__icon-line">
          {isLogIn ? (
            <Fragment>
              <TickIcon checkIsSignIn={checkIsSignIn} />{" "}
              <span
                className={
                  activeLineSignIn
                    ? "process-bar__line--active process-bar__line"
                    : "process-bar__line"
                }
              ></span>
            </Fragment>
          ) : null}
        </div>
        <p
          className={
            endpoint === "/shipping"
              ? "process-bar__signIn"
              : "process-bar__signIn"
          }
        >
          Sign In
        </p>
      </div>
      <div className="process-bar__wrapper">
        <div className="process-bar__icon-line">
          {checkIsShippingCheckout ? (
            checkerShip ? (
              <Fragment>
                <TickIcon />{" "}
                <span className="process-bar__line--active-ship-line process-bar__line"></span>
              </Fragment>
            ) : (
              <Fragment>
                <TickIcon checkIsShippingCheckout={checkIsShippingCheckout} />{" "}
                <span
                  className={
                    activeLineShipping
                      ? "process-bar__line--active-ship-line process-bar__line"
                      : "process-bar__line"
                  }
                ></span>
              </Fragment>
            )
          ) : (
            <Fragment>
              <TickIcon isInActive={isInActive} />
              <span className="process-bar__line--inActive"></span>
            </Fragment>
          )}
        </div>
        <Link
          to="/shipping"
          className={
            endpoint === "/shipping"
              ? "process-bar__shipping--active"
              : "process-bar__shipping"
          }
        >
          Shipping
        </Link>
      </div>
      <div className="process-bar__wrapper">
        <div className="process-bar__icon-line">
          {checkIsPaymentCheckout ? (
            checkerPayment ? (
              <Fragment>
                <TickIcon />
                <span className="process-bar__line--active-payment-line process-bar__line"></span>
              </Fragment>
            ) : (
              <Fragment>
                <TickIcon checkIsShippingCheckout={checkIsShippingCheckout} />
                <span
                  className={
                    activeLinePayment
                      ? "process-bar__line--active-payment-line process-bar__line"
                      : "process-bar__line"
                  }
                ></span>
              </Fragment>
            )
          ) : (
            <Fragment>
              <TickIcon isInActive={isInActive} />
              <span className="process-bar__line--inActive"></span>
            </Fragment>
          )}
        </div>
        <Link
          to={checkCanGoPayment ? "/payment" : endpoint}
          className={
            (endpoint === "/payment" && "process-bar__payment--active") ||
            (endpoint === "/place-order"
              ? "process-bar__payment--inactive"
              : null) ||
            (endpoint === "/shipping" && "process-bar__payment")
          }
        >
          Payment
        </Link>
      </div>
      <div className="process-bar__wrapper">
        <div className="process-bar__icon-line">
          {checkIsPlaceOrderCheckout ? (
            checkerPlaceOrder ? (
              <TickIcon />
            ) : (
              <TickIcon
                checkIsPlaceOrderCheckout={checkIsPlaceOrderCheckout}
                checkIsShippingCheckout={checkIsShippingCheckout}
                drawIcon={drawIcon}
              />
            )
          ) : (
            <TickIcon isInActive={isInActive} />
          )}
        </div>
        <Link
          to={checkCanGoPlaceOrder ? "/place-order" : endpoint}
          className={
            endpoint === "/place-order"
              ? "process-bar__place-order--active"
              : "process-bar__place-order"
          }
        >
          Place Order
        </Link>
      </div>
    </div>
  );
};

export default ProcessBar;
