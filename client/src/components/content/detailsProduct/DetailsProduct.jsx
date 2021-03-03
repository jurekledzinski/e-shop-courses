import React, { useContext, useEffect, useState } from "react";

import "./DetailsProduct.scss";

import {
  downloadCustomersReviews,
  updateCourse,
} from "../../../utils/sessions";

import ButtonGoBack from "../../others/buttonGoBack/ButtonGoBack";
import DetailsProductCommentForm from "./DetailsProductCommentForm";
import SingleComment from "./SingleComment";

import { StoreContext } from "../../../store/StoreProvider";
import { CartContext } from "../../../store/CartProvider";

const DetailsProduct = ({ history, location }) => {
  const {
    adjustValidationMsg,
    commentProduct,
    courses,
    setCommentProduct,
    setErrorServerMsg,
    setIsloadFirstTimePage,
    user,
    validationMsg,
  } = useContext(StoreContext);

  const { addToCart, cart } = useContext(CartContext);

  const [averageRateStars, setAverageRateStars] = useState(null);

  const idCourse = location.pathname.slice(9);

  let detailedCourse = courses.find((item) => item._id === idCourse);
  const {
    author,
    amount,
    description,
    imagePath,
    title,
    price,
  } = detailedCourse;

  let findedUser =
    Boolean(user) && commentProduct.find((item) => item.userId === user.userId);

  const productFromCart = cart.find((item) => item._id === idCourse);
  const showInStockProductAmount = Boolean(productFromCart)
    ? amount - productFromCart.totalQtyProduct
    : amount;

  const checkBackOrders =
    Boolean(productFromCart) && amount - productFromCart.totalQtyProduct < 0;

  const showTitleInstockorNot = Boolean(productFromCart)
    ? amount - productFromCart.totalQtyProduct > 0
      ? "Add to cart"
      : "No more items in stock"
    : amount > 0
    ? "Add to cart"
    : "Out of Stock";

  const AddBtnDisabledOrNot = Boolean(productFromCart)
    ? amount - productFromCart.totalQtyProduct > 0
      ? false
      : true
    : amount > 0
    ? false
    : true;

  const productInorOutStock = Boolean(productFromCart)
    ? amount - productFromCart.totalQtyProduct > 0
      ? "product__addToCart"
      : "product__out-of-stock"
    : amount > 0
    ? "product__addToCart"
    : "product__out-of-stock";

  const handleAddToCart = () => {
    addToCart(idCourse);
  };

  const fetchCustomersCommentsProduct = async () => {
    const { data, status } = await downloadCustomersReviews(idCourse);

    status === 200 ? setCommentProduct(data) : setErrorServerMsg(data);
  };

  const countAverageRate = (updatedProduct) => {
    const reducer = (accumulator, item) => {
      return accumulator + item.rate;
    };

    let connectedComments;
    Boolean(updatedProduct)
      ? (connectedComments = commentProduct.concat(updatedProduct))
      : null;

    let total;
    Boolean(updatedProduct)
      ? (total = connectedComments.reduce(reducer, 0))
      : (total = commentProduct.reduce(reducer, 0));

    let averageRate;
    Boolean(updatedProduct)
      ? (averageRate = total / connectedComments.length)
      : (averageRate = total / commentProduct.length);

    const averageFixedRate = parseInt(averageRate.toFixed());

    const rateValue = [1, 2, 3, 4, 5];

    const avrageStarsRated = rateValue.map((item) => (
      <i
        key={item}
        data-value={item}
        className={
          item <= averageFixedRate ? "fas fa-star active" : "far fa-star"
        }
      ></i>
    ));

    let updatedCourse = courses.find((item) => item._id === idCourse);
    updatedCourse.averageRate = averageFixedRate;

    return { avrageStarsRated, updatedCourse };
  };

  const updateCourseAverageRate = async (updatedProduct) => {
    const { updatedCourse } = countAverageRate(updatedProduct);
    await updateCourse(updatedCourse);
  };

  useEffect(() => {
    fetchCustomersCommentsProduct();
  }, []);

  useEffect(() => {
    const { avrageStarsRated } = countAverageRate();
    setAverageRateStars(avrageStarsRated);
  }, [commentProduct]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const checkIsUserLogged = Boolean(user) ? (
    <DetailsProductCommentForm
      adjustValidationMsg={adjustValidationMsg}
      commentProduct={commentProduct}
      idCourse={idCourse}
      setCommentProduct={setCommentProduct}
      setIsloadFirstTimePage={setIsloadFirstTimePage}
      updateCourseAverageRate={updateCourseAverageRate}
      user={user}
      validationMsg={validationMsg}
    />
  ) : (
    <p className="product__info-reviews-alert">
      Please sign in to write review <i className="fas fa-lock"></i>
    </p>
  );

  const reviewsCustomers = commentProduct.map((item) => (
    <SingleComment key={item._id} {...item} />
  ));

  const message = (
    <p className="product__info-reviews-alert">
      You already reviewed this product
    </p>
  );

  return (
    <article className="article-product">
      <div className="article-product product">
        <ButtonGoBack history={history} />
        <div className="product__wrapper">
          <div className="product__image">
            <img src={imagePath} alt="" className="product__img" />
          </div>
          <div className="product__details">
            <h2 className="product__title">{title}</h2>
            <p className="product__authors">{author}</p>
            <p className="product__text">{description}</p>
            <div className="product__avarage-rating">
              {averageRateStars}
              <span className="product__rating-text">
                {commentProduct.length === 1
                  ? `${commentProduct.length} review`
                  : `${commentProduct.length} reviews`}
              </span>
            </div>
            <div className="product__details-1">
              <p className="product__price">Price: {price}€</p>
              <div className="product__details-3">
                <button
                  className={productInorOutStock}
                  onClick={handleAddToCart}
                  disabled={AddBtnDisabledOrNot}
                >
                  {checkBackOrders ? "Out of stock" : showTitleInstockorNot}
                </button>
                <p className="product__inStock">
                  In stock: {showInStockProductAmount}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="product__reviews">
          <h2 className="product__reviews-title">Reviews</h2>
          {reviewsCustomers}
          <div className="product__info-reviews">
            <h2 className="product__info-reviews-title">Add your own review</h2>
            {Boolean(findedUser) && findedUser.isRate && findedUser.isComment
              ? message
              : checkIsUserLogged}
          </div>
        </div>
      </div>
    </article>
  );
};

export default DetailsProduct;
