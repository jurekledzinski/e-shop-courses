import React, { useEffect, useRef, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { TweenMax, Power3 } from "gsap";

import "./InventoryIssue.scss";

import Modal from "../../others/modal/Modal";

import InventoryProduct from "./InventoryProduct";

const InventoryIssue = ({
  cart,
  chooseModal,
  CloseInventory,
  inventoryIssueCourses,
  isInventoryOpen,
  cantCloseDiv,
  productsOkInCart,
  setCart,
  setchooseModal,
  setIsOpenCheckoutModal,
  updateTotal,
  setInventoryIssueCourses,
}) => {
  const [flagApplyChange, setFlagApplyChange] = useState(true);
  const [onlyFirstApply, setOnlyFirstApply] = useState(false);

  const timeclear = useRef(null);
  const issuePanelRef = useRef(null);

  const handleChangesWithInventoryBtn = () => {
    setFlagApplyChange(false);
    setOnlyFirstApply(true);
  };

  const handleReturnHomeBtn = () => {
    setIsOpenCheckoutModal(false);
  };

  const issueCourses = inventoryIssueCourses.map((item) => (
    <InventoryProduct
      key={item._id}
      {...item}
      cart={cart}
      CloseInventory={CloseInventory}
      inventoryIssueCourses={inventoryIssueCourses}
      flagApplyChange={flagApplyChange}
      onlyFirstApply={onlyFirstApply}
      productsOkInCart={productsOkInCart}
      setCart={setCart}
      setOnlyFirstApply={setOnlyFirstApply}
      updateTotal={updateTotal}
      uuid={uuidv4()}
      setchooseModal={setchooseModal}
      chooseModal={chooseModal}
      setInventoryIssueCourses={setInventoryIssueCourses}
    />
  ));

  useEffect(() => {
    timeclear.current = setTimeout(() => {
      if (issuePanelRef.current) {
        TweenMax.to(issuePanelRef.current, 0.8, {
          opacity: 1,
          y: 0,
          ease: Power3.easeOut,
        });
      }
    }, []);

    return () => clearTimeout(timeclear.current);
  }, [issuePanelRef.current, timeclear.current]);

  return (
    <Modal
      handleClose={CloseInventory}
      isOpen={isInventoryOpen}
      unavailableToCloseModalClickOnDiv={cantCloseDiv}
    >
      <div className="inventory-issue" ref={issuePanelRef}>
        <h2 className="inventory-issue__title">Inventory issues</h2>
        <p className="inventory-issue__text">
          Some of the items in your cart became unavailable during your checkout
          process
        </p>
        {issueCourses}
        <div className="inventory-issue__choice-btns">
          <button
            className="inventory-issue__apply-btn"
            onClick={handleChangesWithInventoryBtn}
          >
            Apply these changes
          </button>
          <button
            className="inventory-issue__return-btn"
            onClick={handleReturnHomeBtn}
          >
            Return to store
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default InventoryIssue;
