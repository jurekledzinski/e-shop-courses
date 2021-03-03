import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Course.scss";

import { CartContext } from "../../../store/CartProvider.js";

const Course = ({
  _id,
  title,
  imagePath,
  price,
  author,
  amount,
  averageRate,
}) => {
  const { addToCart, cart } = useContext(CartContext);
  const [rateStars, setRateStars] = useState(null);

  const allAuthors = author.join(", ");

  const findedCourseInCart = cart.find((item) => item._id === _id);

  const addClassIsInStockOrOutStock = Boolean(findedCourseInCart)
    ? amount - findedCourseInCart.totalQtyProduct > 0
      ? "course__button"
      : "course__out-of-stock"
    : amount > 0
    ? "course__button"
    : "course__out-of-stock";

  const BtnDisabledTesOrNo = Boolean(findedCourseInCart)
    ? amount - findedCourseInCart.totalQtyProduct > 0
      ? false
      : true
    : amount > 0
    ? false
    : true;

  const showBtnTitleInStockorOutStock = Boolean(findedCourseInCart)
    ? amount - findedCourseInCart.totalQtyProduct > 0
      ? "Add to cart"
      : "No more items in stock"
    : amount > 0
    ? "Add to cart"
    : "Out of Stock";

  const showInStockProductsNumber = Boolean(findedCourseInCart)
    ? amount - findedCourseInCart.totalQtyProduct
    : amount;

  const checkBackOrders =
    Boolean(findedCourseInCart) &&
    amount - findedCourseInCart.totalQtyProduct < 0;

  const updatedStockMessage = checkBackOrders ? (
    <span
      className="course__msg-update-stock"
      style={{ color: "green", marginLeft: 10, display: "inline-block" }}
    >
      Stock has been updated
    </span>
  ) : null;

  useEffect(() => {
    const rateValue = [1, 2, 3, 4, 5];

    const average = rateValue.map((item) => (
      <i
        key={item}
        data-value={item}
        className={item <= averageRate ? "fas fa-star active" : "far fa-star"}
      ></i>
    ));
    setRateStars(average);
  }, []);

  return (
    <div className="course">
      <article className="course__article">
        <Link to={`/details/${_id}`}>
          <img className="course__image" src={imagePath} alt={title} />
        </Link>
        <h4 className="course__title">{title}</h4>
        <div className="course__section">
          <p className="course__rating">{rateStars}</p>
          <p className="course__price">{`Price: ${
            price === 0 ? "Free" : `${price}€`
          }`}</p>
          <p className="course__author">{allAuthors}</p>
          <p className="course__amount">
            In stock:
            {checkBackOrders ? 0 : showInStockProductsNumber}
            {updatedStockMessage}
          </p>
        </div>
        <button
          className={addClassIsInStockOrOutStock}
          onClick={() => addToCart(_id)}
          disabled={BtnDisabledTesOrNo}
        >
          {checkBackOrders ? "Out of stock" : showBtnTitleInStockorOutStock}
        </button>
      </article>
    </div>
  );
};

export default Course;
