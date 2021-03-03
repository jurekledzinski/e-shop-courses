import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./DetailsProductCommentForm.scss";

import { createCustomerCommentProduct } from "../../../utils/sessions";

const DetailsProductCommentForm = ({
  commentProduct,
  idCourse,
  setCommentProduct,
  updateCourseAverageRate,
  setIsloadFirstTimePage,
  user,
}) => {
  const [isCommented, setIsCommented] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");
  const [rate, setRate] = useState(0);
  const [valueTitle, setValueTitle] = useState({
    title: "",
  });
  const [valueComment, setValueComment] = useState({
    review: "",
  });

  const rates = [1, 2, 3, 4, 5];

  const handleRating = (e) => {
    const rate = parseInt(e.target.dataset.value);
    setRate(rate);
    setIsRated(true);
    rate !== 0 && setMsgAlert("");
  };

  const stars = rates.map((item) => (
    <i
      key={item}
      data-value={item}
      className={item <= rate ? "fas fa-star active" : "far fa-star"}
      onClick={handleRating}
    ></i>
  ));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueTitle({ ...valueTitle, [name]: value });
    setValueComment({ ...valueComment, [name]: value });
    setIsCommented(true);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    let date = new Date().toISOString().slice(0, 10);

    const userReview = {
      comment: valueComment.review,
      date: date,
      _id: uuidv4(),
      idCourse: idCourse,
      isComment: isCommented,
      isRate: isRated,
      rate: rate,
      title: valueTitle.title,
      userId: user.userId,
      username: user.user,
    };

    const { data, status } = await createCustomerCommentProduct(userReview);

    if (status === 200) {
      setCommentProduct([...commentProduct, userReview]);
      setIsloadFirstTimePage(true);
      updateCourseAverageRate(userReview);
    } else {
      setMsgAlert(data.alert);
    }
  };

  const validateMessageComopnent = msgAlert ? (
    <p className="product-review__alert">{msgAlert}</p>
  ) : null;

  return (
    <div className="product-review">
      {validateMessageComopnent}
      <div className="product-review__rating">{stars}</div>
      <form className="product-review__form" onSubmit={handleSubmitReview}>
        <div className="product-review__details">
          <input
            className="product-review__input"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={valueTitle.title}
            required
          />
          <label className="product-review__label">Title</label>
        </div>
        <div className="product-review__details">
          <textarea
            className="product-review__textarea"
            name="review"
            placeholder="Comment"
            onChange={handleChange}
            value={valueComment.review}
            required
          />
          <label className="product-review__label">Comment</label>
        </div>
        <button className="product-review__button">Submit</button>
      </form>
    </div>
  );
};

export default DetailsProductCommentForm;
