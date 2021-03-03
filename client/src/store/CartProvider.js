import React, { createContext, useEffect, useContext, useState } from "react";

import { StoreContext } from "./StoreProvider";

export const CartContext = createContext(null);

import {
  createCartMongo,
  deleteCartFromMongo,
  getCartFromMongo,
} from "../utils/sessions";

const CartProvider = ({ children }) => {
  const {
    courses,
    fetchData,
    orginalCourses,
    setCheckCanGoPayment,
    setCheckCanGoPlaceOrder,
    setErrorServerMsg,
    setCourses,
    setCheckIsSignIn,
    setCheckIsShippingCheckout,
    setCheckerShip,
    setCheckIsPaymentCheckout,
    setCheckerPayment,
    setCheckIsPlaceOrderCheckout,
    setCheckerPlaceOrder,
    setDrawIcon,
    setNameCheckers,
    setActiveLineStepCheckout,
    setActiveLineSignIn,
    setActiveLineShipping,
    setActiveLinePayment,
    user,
  } = useContext(StoreContext);

  const localStorageCartShopping = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const [cart, setCart] = useState(localStorageCartShopping);
  const [totalQtyCart, setTotalQtyCart] = useState(0);
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [
    isUserLoggedFromProceedCheckoout,
    setIsUserLoggedFromProceedCheckoout,
  ] = useState(false);

  const comeBackToDefaultDetailsCourses = (id) => {
    let copiedArr = [...courses];
    const originalCourseCopy = [...orginalCourses];

    let removedCourse = copiedArr.find((item) => item._id === id);
    const deletedCourseOrignal = originalCourseCopy.find(
      (item) => item._id === id
    );
    let index = copiedArr.indexOf(removedCourse);
    let courseUpdate = copiedArr[index];
    courseUpdate.amount = deletedCourseOrignal.amount;

    setCourses([...copiedArr]);
  };

  const updateTotal = (tempCourse) => {
    let totalPriceOfProducts = 0;
    let totalQtyOfProducts = 0;

    cart.map((item) => {
      totalPriceOfProducts += item.totalPriceProduct;
      totalQtyOfProducts += item.totalQtyProduct;
    });
    if (tempCourse) {
      totalPriceOfProducts += tempCourse.totalPriceProduct;
      totalQtyOfProducts += tempCourse.totalQtyProduct;
    }
    setTotalQtyCart(totalQtyOfProducts);
    setTotalPriceCart(totalPriceOfProducts);
  };

  const createCopyCart = () => {
    let copiedArr = [...courses];
    let copyDeepCourses = [];
    copiedArr.forEach((item) => {
      const singleCourse = { ...item };
      copyDeepCourses = [...copyDeepCourses, singleCourse];
    });
    return copyDeepCourses;
  };

  const addToCart = (id) => {
    const deepCopiedCourses = createCopyCart();
    const tempCourse = deepCopiedCourses.find((item) => item._id === id);
    const isCourseAlreadyInCart = cart.find((item) => item._id === id);

    if (Boolean(isCourseAlreadyInCart)) {
      const updateCart = cart.map((item) => {
        if (item._id === id && item.amount > 0) {
          item.amount = item.amount - 1;
          item.totalQtyProduct = item.totalQtyProduct + 1;
          item.totalPriceProduct = item.totalQtyProduct * item.price;
          return item;
        }
        return item;
      });
      setCart([...updateCart]);
      updateTotal();
    } else {
      tempCourse.totalQtyProduct = 0;
      tempCourse.totalPriceProduct = 0;
      tempCourse.amount = tempCourse.amount - 1;
      tempCourse.totalQtyProduct = tempCourse.totalQtyProduct + 1;
      tempCourse.totalPriceProduct =
        tempCourse.totalQtyProduct * tempCourse.price;
      setCart([...cart, tempCourse]);
      updateTotal(tempCourse);
    }
  };

  const increaseProduct = (id) => {
    const copiedArr = [...courses];
    const findedCourse = copiedArr.find((item) => item._id === id);
    if (findedCourse.amount > 0) {
      const updateCart = cart.map((item) => {
        if (item._id === id && item.amount > 0) {
          item.amount = item.amount - 1;
          item.totalQtyProduct = item.totalQtyProduct + 1;
          item.totalPriceProduct = item.totalQtyProduct * item.price;
          return item;
        }
        return item;
      });
      setCart([...updateCart]);
      updateTotal();
    }
  };

  const decreaseProduct = (id) => {
    const copiedArr = [...courses];
    const findedCourse = copiedArr.find((item) => item._id === id);
    if (findedCourse.amount >= 0) {
      const updateCart = cart.map((item) => {
        if (item._id === id && item.totalQtyProduct > 1) {
          item.amount = item.amount + 1;
          item.totalQtyProduct = item.totalQtyProduct - 1;
          item.totalPriceProduct = item.totalQtyProduct * item.price;
          return item;
        }
        return item;
      });
      setCart([...updateCart]);
      updateTotal();
    }
  };

  const removeProduct = (id) => {
    updateTotal();
    let afterDeleteCourses = cart.filter((item) => item._id !== id);
    setCart([...afterDeleteCourses]);
    comeBackToDefaultDetailsCourses(id);
  };

  const clearCart = () => {
    setCart([]);
    fetchData();
    localStorage.removeItem("cart");
  };

  const updateCartInMongo = async () => {
    if (Boolean(user)) {
      let orderCartData = {
        userId: user.userId,
        cart: cart,
        totalQtyCart: totalQtyCart,
        totalPriceCart: totalPriceCart,
      };

      if (cart.length > 0) {
        const { data, status } = await createCartMongo(orderCartData);
        status !== 200 ? setErrorServerMsg(data) : null;
      } else {
        const { data, status } = await deleteCartFromMongo(user.userId);
        status !== 200 ? setErrorServerMsg(data) : null;
      }
    }
  };

  useEffect(() => {
    setCheckCanGoPayment(false);
    setCheckCanGoPlaceOrder(false);
    setCheckIsSignIn(true);
    setCheckIsShippingCheckout(false);
    setCheckerShip(false);
    setCheckIsPaymentCheckout(false);
    setCheckerPayment(false);
    setCheckIsPlaceOrderCheckout(false);
    setCheckerPlaceOrder(false);
    setDrawIcon(false);
    setNameCheckers("");
    setActiveLineStepCheckout("");
    setActiveLineSignIn(false);
    setActiveLineShipping(false);
    setActiveLinePayment(false);
    updateCartInMongo();
  }, [totalQtyCart]);

  const fetchCartFromMongoDatabase = async () => {
    const { userId } = user;
    const { data, status } = await getCartFromMongo(userId);
    let productsCart = [];
    if (Boolean(data) && status === 200) {
      data.cart.forEach((item) => {
        const singleItem = { ...item };
        productsCart = [...productsCart, singleItem];
      });
      setCart(data.cart);
    }
    Boolean(data) && status !== 200 ? setErrorServerMsg(data) : null;
  };

  useEffect(() => {
    if (Boolean(user)) {
      fetchCartFromMongoDatabase();
    }
  }, [user]);

  useEffect(() => {
    updateTotal();
    fetchData(cart, setCart);
    if (!Boolean(user)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      setIsUserLogged(Boolean(user));
    }
  }, [cart, user]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        cart,
        clearCart,
        decreaseProduct,
        isUserLogged,
        isUserLoggedFromProceedCheckoout,
        increaseProduct,
        removeProduct,
        setCart,
        setIsUserLogged,
        setIsUserLoggedFromProceedCheckoout,
        totalPriceCart,
        totalQtyCart,
        updateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
