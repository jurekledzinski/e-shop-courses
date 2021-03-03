import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import { TweenMax, Power3 } from "gsap";

import { v4 as uuidv4 } from "uuid";

import { StoreContext } from "../../../../store/StoreProvider";
import { CartContext } from "../../../../store/CartProvider";

import {
  saveOrderPaidByCustomer,
  updateManyCourses,
} from "../../../../utils/sessions";

import InformationMessagePaypal from "../paypalTransactionMessage/InformationMessagePaypal";

const PayButtonPaypal = ({
  cart,
  city,
  country,
  departmentState,
  name,
  numberStreet,
  postCode,
  surname,
  street,
  shippingPrice,
  totalPriceOrder,
  totalPriceCart,
  customerDetails,
}) => {
  const { courses, setCourses, setErrorServerMsg, setFlag, user } = useContext(
    StoreContext
  );
  const { clearCart } = useContext(CartContext);

  const [checkToClearTick, setCheckToClearTick] = useState(false);
  const [isPay, setIsPay] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancel, setIsCancel] = useState(false);
  const [payerName, setPayerName] = useState("");

  let buyedProducts = useRef([]);
  const idTimeOut = useRef(false);
  const isMounted = useRef(false);
  const msgPopUpRef = useRef(null);
  const paypalBtnRefContainer = useRef();
  const timeOutClear = useRef(null);

  const history = useHistory();

  const deepCopyCourses = () => {
    let copyCourses = [];
    courses.forEach((item) => {
      const singleCourse = { ...item };
      copyCourses = [...copyCourses, singleCourse];
    });
    return copyCourses;
  };

  const completeOrderDataPayed = async (dataPaypal, details) => {
    let detailsOrderPayed = [];
    customerDetails.forEach((item) => {
      let singleOrderDetails = { ...item };
      detailsOrderPayed = [...detailsOrderPayed, singleOrderDetails];
    });

    const datePay = details.update_time.slice(0, 10);
    const timePay = details.update_time.slice(11, 19);
    let orderDateTime = datePay + " " + timePay;

    const orderPaidByCustomer = detailsOrderPayed.map((item) => {
      return {
        ...item,
        isPayed: true,
        payerId: dataPaypal.payerID,
        orderId: dataPaypal.orderID,
        datePayed: orderDateTime,
      };
    });

    const pullPaidOrder = orderPaidByCustomer.shift();

    delete pullPaidOrder._id;
    delete pullPaidOrder.__v;

    const { data, status } = await saveOrderPaidByCustomer(pullPaidOrder);

    status !== 200 ? setErrorServerMsg(data) : null;

    let coursesCopy = deepCopyCourses();

    let newArrayCourses = coursesCopy.map((item1) => {
      if (cart.length > 0) {
        let item2 = cart.find((item) => item._id === item1._id);
        if (Boolean(item2)) {
          item1.amount = item1.amount - item2.totalQtyProduct;
        }
        return item1;
      }
    });

    newArrayCourses.forEach(async (item) => {
      await updateManyCourses(item);
    });

    await setCourses(newArrayCourses);
    await setFlag((prevValue) => !prevValue);
  };

  useEffect(() => {
    cart.map((item) => {
      let singleProduct = {
        name: item.title,
        unit_amount: {
          value: item.price.toString(),
          currency_code: "EUR",
        },
        quantity: item.totalQtyProduct.toString(),
      };

      buyedProducts.current = [...buyedProducts.current, singleProduct];
    });

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "buynow",
          height: 35,
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPriceOrder.toString(),
                  currency_code: "EUR",
                  breakdown: {
                    item_total: {
                      value: totalPriceCart.toString(),
                      currency_code: "EUR",
                    },
                    shipping: {
                      value: shippingPrice.toString(),
                      currency_code: "EUR",
                    },
                  },
                },
                invoice_id: uuidv4(),
                items: buyedProducts.current,
                shipping: {
                  address: {
                    address_line_1: `${street} ${numberStreet}`,
                    admin_area_1: departmentState,
                    admin_area_2: city,
                    country_code: country,
                    postal_code: postCode,
                  },
                  name: {
                    full_name: `${name} ${surname}`,
                  },
                },
              },
            ],
          });
        },

        onApprove: (data, actions) => {
          return actions.order.capture().then(async (details) => {
            await completeOrderDataPayed(data, details);
            setIsPay(true);
            setIsModalOpen(true);
            setPayerName(user.user);
            clearCart();
          });
        },

        onError: (err) => {
          setIsError(true);
          setIsModalOpen(true);
        },

        onCancel: () => {
          setIsModalOpen(true);
          setIsCancel(true);
        },
      })
      .render(paypalBtnRefContainer.current);
  }, []);

  const closeModalMessage = () => {
    if (isMounted.current) {
      idTimeOut.current = setTimeout(() => {
        setIsModalOpen(false);
        setIsPay(false);
        setIsCancel(false);
        setCheckToClearTick(true);
        if (isError) {
          history.push("/shopping-cart");
        } else if (isPay) {
          history.push("/");
        }
      }, 5000);
    }
  };

  useEffect(() => {
    closeModalMessage();
    return () => clearTimeout(idTimeOut.current);
  }, [isModalOpen]);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    timeOutClear.current = setTimeout(() => {
      if (msgPopUpRef.current) {
        TweenMax.to(msgPopUpRef.current, 0.8, {
          opacity: 1,
          y: 0,
          ease: Power3.easeOut,
        });
      }
    }, 100);

    return () => clearTimeout(timeOutClear.current);
  }, [isCancel, isError, isModalOpen, isPay, msgPopUpRef.current]);

  const showModalIsPayed = isPay ? (
    <InformationMessagePaypal
      checkToClearTick={checkToClearTick}
      isPay={isPay}
      isOpen={isModalOpen}
      handleClose={handleClose}
      setCheckToClearTick={setCheckToClearTick}
      subtitle="You will be redirect to home page.."
      title={`Thank you for your purchase ${payerName}, transaction successful.`}
      ref={msgPopUpRef}
    />
  ) : null;

  const showModalErrorPaypal = isError ? (
    <InformationMessagePaypal
      checkToClearTick={checkToClearTick}
      isPay={isPay}
      isOpen={isModalOpen}
      handleClose={handleClose}
      setCheckToClearTick={setCheckToClearTick}
      subtitle="You will be redirect to home page. Please try one more time."
      title="Error during proccesing payment."
      partTitle={"We are sorry for inconvenience."}
      ref={msgPopUpRef}
    />
  ) : null;

  const showModalCancelPaypal = isCancel ? (
    <InformationMessagePaypal
      checkToClearTick={checkToClearTick}
      isPay={isPay}
      isOpen={isModalOpen}
      handleClose={handleClose}
      setCheckToClearTick={setCheckToClearTick}
      subtitle=" Your order is canceled successfully."
      title=" Please check your order before paying.."
      ref={msgPopUpRef}
    />
  ) : null;

  return (
    <>
      {showModalIsPayed}
      {showModalErrorPaypal}
      {showModalCancelPaypal}
      <div ref={paypalBtnRefContainer} id="paypal-button-container"></div>
    </>
  );
};

export default PayButtonPaypal;
