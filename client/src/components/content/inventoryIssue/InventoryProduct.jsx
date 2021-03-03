import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

import "./InventoryProduct.scss";

import { StoreContext } from "../../../store/StoreProvider";

import { InventoryContext } from "../../../store/InventoryProvider";

const InventoryProduct = ({
  amount,
  cart,
  chooseModal,
  CloseInventory,
  flagApplyChange,
  _id,
  imagePath,
  inventoryIssueCourses,
  onlyFirstApply,
  price,
  productsOkInCart,
  setCart,
  setchooseModal,
  setOnlyFirstApply,
  title,
  updateTotal,
  uuid,
}) => {
  const { setActiveLineStepCheckout, user } = useContext(StoreContext);

  const { isChangedValue, setIsChangedValue } = useContext(InventoryContext);

  const [reduceOrRemove, setReduceOrRemove] = useState("remove");
  const [onlyRemove, setOnlyRemove] = useState("onlyRemove");
  const timeOutClear = useRef(null);

  const history = useHistory();

  const copyIssueCourses = () => {
    let copyDeepCourses = [];
    inventoryIssueCourses.forEach((item) => {
      const singleCourse = { ...item };
      copyDeepCourses = [...copyDeepCourses, singleCourse];
    });
    return copyDeepCourses;
  };

  const copyCartCourses = () => {
    let copyDeepCart = [];
    cart.forEach((item) => {
      const singleCourse = { ...item };
      copyDeepCart = [...copyDeepCart, singleCourse];
    });
    return copyDeepCart;
  };

  const returnToCartReducedCourse = (_id) => {
    const copiedIssueCourses = copyIssueCourses();

    const index = copiedIssueCourses.findIndex((item) => item._id === _id);
    let issueCourse = copiedIssueCourses[index];

    issueCourse.totalQtyProduct = issueCourse.amount;
    issueCourse.totalPriceProduct = issueCourse.amount * issueCourse.price;
    issueCourse.amount = issueCourse.amount - issueCourse.totalQtyProduct;

    updateTotal(issueCourse);
    setCart([...cart, issueCourse]);
  };

  const handleCheckedRadioBtns = (e) => {
    const value = e.target.value;

    setReduceOrRemove(value);

    const copiedDeepCart = copyCartCourses();

    const index = copiedDeepCart.findIndex((item) => item._id === _id);

    if (index === -1) returnToCartReducedCourse(_id);

    let updatedCartCourse = copiedDeepCart[index];

    if (
      value === "reduce" &&
      amount !== undefined &&
      price !== undefined &&
      Boolean(updatedCartCourse)
    ) {
      setIsChangedValue(true);
      updatedCartCourse.totalQtyProduct = amount;
      updatedCartCourse.totalPriceProduct = amount * price;
      updatedCartCourse.amount = amount - updatedCartCourse.totalQtyProduct;

      setCart([...copiedDeepCart]);
      Boolean(!user)
        ? localStorage.setItem(
            "cart",
            JSON.stringify([...cart, copiedDeepCart])
          )
        : null;
    } else if (value === "remove") {
      setIsChangedValue(true);
      const restCoursesAfterRemove = copiedDeepCart.filter(
        (item) => item._id !== _id
      );
      setCart(restCoursesAfterRemove);
    }
  };

  const handleOnlyRemove = (e) => {
    let copyCart = [...cart];
    const value = e.target.value;
    setOnlyRemove(value);
    if (value === "onlyRemove") {
      const restCoursesAfterRemove = copyCart.filter(
        (item) => item._id !== _id
      );

      setCart(restCoursesAfterRemove);
    }
  };

  const mergeInToOneArray = (arr) => {
    let mergedAllPaidOrders = arr.reduce(
      (
        acc,
        {
          amount,
          author,
          averageRate,
          dateMilliseconds,
          dateString,
          description,
          imagePath,
          price,
          title,
          totalPriceProduct,
          totalQtyProduct,
          __v,
          _id,
        }
      ) => {
        let tempProduct = acc.find((pro) => pro._id === _id);
        if (!tempProduct) {
          acc = [
            ...acc,
            {
              amount,
              author,
              averageRate,
              dateMilliseconds,
              dateString,
              description,
              imagePath,
              price,
              title,
              totalPriceProduct,
              totalQtyProduct,
              __v,
              _id,
            },
          ];
        } else {
          acc = acc.filter((item1) => item1._id === _id);
        }
        return acc;
      },
      []
    );

    return mergedAllPaidOrders;
  };

  useEffect(() => {
    if (onlyFirstApply) {
      setOnlyFirstApply(false);
      if (isChangedValue) {
        const copiedIssueCourses = copyIssueCourses();

        let productsUpdateCart = [];

        copiedIssueCourses.map((item1) => {
          let result = cart.filter(
            (item2) =>
              item1._id === item2._id &&
              item1.amount === item2.amount + item2.totalQtyProduct
          );

          productsUpdateCart = [...productsUpdateCart, ...result];
        });

        const coursesMerge = mergeInToOneArray(productsUpdateCart);

        let newArrCourses = [];

        newArrCourses = [...coursesMerge, ...productsOkInCart];
        setCart(newArrCourses);
        Boolean(!user)
          ? setchooseModal(true)
          : (timeOutClear.current = setTimeout(() => {
              setActiveLineStepCheckout("lineSignIn");
              history.push("/shipping");
            }, 300));
      } else {
        if (productsOkInCart.length > 0) {
          setCart(productsOkInCart);
          Boolean(!user)
            ? setchooseModal(true)
            : (timeOutClear.current = setTimeout(() => {
                setActiveLineStepCheckout("lineSignIn");
                history.push("/shipping");
              }, 300));
        } else {
          setCart([]);
          CloseInventory();
        }
      }
    }
  }, [chooseModal, flagApplyChange, reduceOrRemove]);

  useEffect(() => {}, []);

  const optionIfMoreItemsThanZero = amount > 0 && (
    <div className="inventory-product__checkRadio-reduce-or-remove">
      <label
        htmlFor={uuid + 1}
        className="inventory-product__label-reduce-or-remove"
      >
        <input
          type="radio"
          id={uuid + 1}
          className="inventory-product__radio-reduce-or-remove"
          name={uuid}
          value="reduce"
          onChange={handleCheckedRadioBtns}
          checked={reduceOrRemove === "reduce"}
        />
        Reduce quantity to{" "}
        <span className="inventory-product__label-amount">{amount}</span>
      </label>

      <label
        htmlFor={uuid + 2}
        className="inventory-product__label-reduce-or-remove"
      >
        <input
          type="radio"
          id={uuid + 2}
          className="inventory-product__radio-reduce-or-remove"
          name={uuid}
          value="remove"
          onChange={handleCheckedRadioBtns}
          checked={reduceOrRemove === "remove"}
        />
        Remove item from order
      </label>
    </div>
  );

  const optionIfLessItemsThanZero = amount <= 0 && (
    <div className="inventory-product__checkRadio">
      <label className="inventory-product__label">Remove item from order</label>
      <input
        type="radio"
        className="inventory-product__radio"
        name={uuid}
        value="onlyRemove"
        onChange={handleOnlyRemove}
        checked={onlyRemove === "onlyRemove"}
      />
    </div>
  );

  return (
    <div className="inventory-issue__inventory-product inventory-product">
      <div className="inventory-product__image">
        <img src={imagePath} alt={title} className="inventory-product__img" />
      </div>
      <div className="inventory-product__details">
        <p className="inventory-product__name">{title}</p>
        {optionIfLessItemsThanZero}
        {optionIfMoreItemsThanZero}
      </div>
    </div>
  );
};
export default InventoryProduct;
