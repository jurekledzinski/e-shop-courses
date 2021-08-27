import React from "react";

import "./SingleComment.scss";

const SingleComment = ({ comment, date, rate, title, username }) => {
  const ratesValue = [1, 2, 3, 4, 5];

  const starsRated = ratesValue.map((item) => (
    <i
      key={item}
      data-value={item}
      className={item <= rate ? "fas fa-star active" : "far fa-star"}
    ></i>
  ));

  return (
    <div className="product__single-comment single-comment">
      <span className="single-comment__date">{date}</span>
      <p className="single-comment__username">{username}</p>
      <h4 className="single-comment__title">{title}</h4>
      <div className="single-comment__rating">{starsRated}</div>
      <p className="single-comment__comment">{comment}</p>
    </div>
  );
};

export default SingleComment;
