import React, { useContext } from "react";

import "./Cart.scss";

import { CartContext } from "../../../store/CartProvider";

import ShoppingPanels from "./ShoppingPanels";

const Cart = () => {
  const {
    cart,
    clearCart,
    decreaseProduct,
    increaseProduct,
    isUserLogged,
    removeProduct,
    setCart,
    setIsUserLoggedFromProceedCheckoout,
    totalQtyCart,
    totalPriceCart,
    updateTotal,
  } = useContext(CartContext);

  const shoppingCart = (
    <ShoppingPanels
      cart={cart}
      clearCart={clearCart}
      decreaseProduct={decreaseProduct}
      increaseProduct={increaseProduct}
      isUserLogged={isUserLogged}
      setCart={setCart}
      setIsUserLoggedFromProceedCheckoout={setIsUserLoggedFromProceedCheckoout}
      removeProduct={removeProduct}
      totalQtyCart={totalQtyCart}
      totalPriceCart={totalPriceCart}
      updateTotal={updateTotal}
    />
  );

  return (
    <section className="section-shopping-cart">
      <div className="shopping-cart">
        <h1 className="shopping-cart__title">Shopping Cart</h1>
        {shoppingCart}
      </div>
    </section>
  );
};
export default Cart;
