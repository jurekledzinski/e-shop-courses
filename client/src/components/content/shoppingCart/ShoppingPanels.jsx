import React, { useContext, useEffect, useRef, useState } from "react";

import { useHistory } from "react-router-dom";

import { NavContext } from "../../../store/NavProvider";
import { StoreContext } from "../../../store/StoreProvider";

import { v4 as uuidv4 } from "uuid";

import "./ShoppingPanels.scss";

import { fetchCourses } from "../../../utils/sessions";

import CartInShoppingCart from "./CardInShoppingCart";
import ModalLoginForm from "../loginForm/ModalLoginForm";
import InventoryIssue from "../inventoryIssue/InventoryIssue";

const ShoppingPanels = ({
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
}) => {
  const { checkSizeWindow } = useContext(NavContext);
  const { setActiveLineStepCheckout, setIsTurnOnRegisterLogin } = useContext(
    StoreContext
  );
  const [productsOkInCart, setProductsOkInCart] = useState([]);

  const [inventoryIssueCourses, setInventoryIssueCourses] = useState([]);
  const [isOpenCheckoutModal, setIsOpenCheckoutModal] = useState(false);
  const [chooseModal, setchooseModal] = useState(false);
  const [isPossibleToCloseModalOnDiv] = useState(false);

  const isMount = useRef(null);
  const history = useHistory();

  const cartCourses = cart.map((item) => (
    <CartInShoppingCart
      key={item._id}
      {...item}
      decreaseProduct={decreaseProduct}
      increaseProduct={increaseProduct}
      removeProduct={removeProduct}
    />
  ));

  const handleProceedToCheckOut = async () => {
    let products = [];
    let productsOk = [];

    const { data, status } = await fetchCourses();

    let copyProducts = [];

    if (status === 200) {
      data.forEach((item) => {
        const singleProduct = { ...item };
        copyProducts = [...copyProducts, singleProduct];
      });
    }

    copyProducts.map((item1) => {
      cart.map((item2) => {
        if (item1._id === item2._id && item1.amount < item2.totalQtyProduct) {
          item1.totalQtyProduct = item2.totalQtyProduct;
          item1.totalPriceProduct = item2.totalPriceProduct;
          item1.uuid = uuidv4();
          products = [...products, item1];
        }

        if (
          item1._id === item2._id &&
          item1.amount === item2.amount + item2.totalQtyProduct
        ) {
          productsOk = [...productsOk, item2];
        }
      });
    });

    setActiveLineStepCheckout("lineSignIn");
    setInventoryIssueCourses(products);
    setProductsOkInCart(productsOk);

    if (products.length > 0 && isMount) {
      setchooseModal(false);
      setIsOpenCheckoutModal(true);
      setIsUserLoggedFromProceedCheckoout(true);
    } else {
      if (!isUserLogged && isMount) {
        setIsTurnOnRegisterLogin((prevValue) => !prevValue);
        setIsUserLoggedFromProceedCheckoout(true);
        setIsOpenCheckoutModal(true);
        checkSizeWindow ? setchooseModal(true) : history.push("/login");
      } else {
        history.push("/shipping");
      }
    }
  };

  const handleClose = () => {
    setIsOpenCheckoutModal(false);
  };

  useEffect(() => {
    isMount.current = true;
    return () => (isMount.current = false);
  }, []);

  const changeComponents = chooseModal ? (
    <ModalLoginForm
      handleClose={handleClose}
      isModalOpen={isOpenCheckoutModal}
      isPossibleToCloseModalOnDiv={isPossibleToCloseModalOnDiv}
    />
  ) : (
    <InventoryIssue
      cart={cart}
      cantCloseDiv={isPossibleToCloseModalOnDiv}
      CloseInventory={handleClose}
      inventoryIssueCourses={inventoryIssueCourses}
      setInventoryIssueCourses={setInventoryIssueCourses}
      isInventoryOpen={isOpenCheckoutModal}
      productsOkInCart={productsOkInCart}
      setCart={setCart}
      setchooseModal={setchooseModal}
      chooseModal={chooseModal}
      setActiveLineStepCheckout={setActiveLineStepCheckout}
      setIsOpenCheckoutModal={setIsOpenCheckoutModal}
      updateTotal={updateTotal}
    />
  );

  const panelLeftCartShowWhenInCartProducts =
    cart.length > 0 ? (
      <div className="shopping-panels__left">{cartCourses}</div>
    ) : (
      <h2 className="shopping-panels__message">Your shopping cart is empty</h2>
    );

  return (
    <div className="shopping-cart__shopping-panels shopping-panels">
      {panelLeftCartShowWhenInCartProducts}

      <div className="shopping-panels__right">
        <p className="shopping-panels__right-title">Order details</p>
        <div className="shopping-panels__checkout">
          <div className="shopping-panels__total">
            <p className="shopping-panels__total__qty">
              <span className="shopping-panels__total-qty-span">
                Total Quantity:{" "}
              </span>
              {totalQtyCart}
            </p>
            <p className="shopping-panels__total-price">
              <span className="shopping-panels__total-price-span">
                Total Price:{" "}
              </span>
              {totalPriceCart}€
            </p>
            <button
              className="shopping-panels__clearcart-btn"
              onClick={() => clearCart()}
              disabled={cart.length > 0 ? false : true}
            >
              Clear cart
            </button>
          </div>
          <button
            className="shopping-panels__checkout-btn"
            onClick={handleProceedToCheckOut}
            disabled={cart.length > 0 ? false : true}
          >
            Proceed to checkout
          </button>
        </div>
      </div>

      {changeComponents}
    </div>
  );
};

export default ShoppingPanels;
