import React from "react";

import "./CardInShoppingCart.scss";

const CartInShoppingCart = ({
  decreaseProduct,
  _id,
  imagePath,
  increaseProduct,
  price,
  removeProduct,
  title,
  totalPriceProduct,
  totalQtyProduct,
}) => {
  return (
    <>
      <div className="shopping-panels__shopping-card shopping-card">
        <div className="shopping-card__image">
          <img className="shopping-card__img" src={imagePath} alt="image" />
        </div>
        <div className="shopping-card__description">
          <div className="shopping-card__details-1">
            <p className="shopping-card__title">{title}</p>
          </div>
          <div className="shopping-card__details-2">
            <p className="shopping-card__price">
              <span className="shopping-card__price-span">Price:</span> {price}€
            </p>
            <p className="shopping-card__total-qty">
              <span className="shopping-card__total-qty-span">Qty: </span>
              {totalQtyProduct}
            </p>

            <div className="shopping-card__change-qty">
              <button
                className="shopping-card__btn-change-amount"
                onClick={() => decreaseProduct(_id)}
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="shopping-card__input-qty">
                {totalQtyProduct}
              </span>
              <button
                className="shopping-card__btn-change-amount"
                onClick={() => increaseProduct(_id)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <p className="shopping-card__total-price-item">
              <span className="shopping-card__total-price-span">Total: </span>
              {totalPriceProduct}€
            </p>
            <button
              className="shopping-card__bin-remove"
              onClick={() => removeProduct(_id)}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartInShoppingCart;
