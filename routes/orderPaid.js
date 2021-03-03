const express = require("express");
const router = express.Router();

const PaidOrder = require("../models/paidOrder.model");

const { ErrorHandler } = require("../errors/error");

router.get("/", isLoggedIn, (req, res, next) => {
  PaidOrder.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  const id = req.params.id;

  PaidOrder.find({ userId: id })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.post("/", isLoggedIn, (req, res, next) => {
  const {
    cart,
    city,
    country,
    dateDelivery,
    dateShipping,
    datePayed,
    departmentState,
    email,
    isDelivered,
    isPayed,
    isShipped,
    name,
    numberStreet,
    paymentMethod,
    payerId,
    orderId,
    phone,
    postCode,
    shipMethod,
    shippingPrice,
    surname,
    street,
    totalQtyCart,
    totalPriceCart,
    totalPriceOrder,
    userId,
  } = req.body;

  const info = {
    alert: "",
    status: 500,
  };

  if (
    !city ||
    !country ||
    !datePayed ||
    !departmentState ||
    !email ||
    !isPayed ||
    !name ||
    !numberStreet ||
    !paymentMethod ||
    !payerId ||
    !orderId ||
    !phone ||
    !postCode ||
    !shipMethod ||
    !shippingPrice ||
    !surname ||
    !street ||
    !totalQtyCart ||
    !totalPriceCart ||
    !totalPriceOrder ||
    !userId
  ) {
    info.alert = "Something went wrong, plaese try one more time all steps";
    return res.status(500).json(info);
  }

  if (!Boolean(info.alert)) {
    const orderDetailsPaid = {
      cart,
      city,
      country,
      dateDelivery,
      dateShipping,
      datePayed,
      departmentState,
      email,
      isDelivered,
      isPayed,
      isShipped,
      name,
      numberStreet,
      paymentMethod,
      payerId,
      orderId,
      phone,
      postCode,
      shipMethod,
      shippingPrice,
      surname,
      street,
      totalQtyCart,
      totalPriceCart,
      totalPriceOrder,
      userId,
    };

    const newPaidOrder = new PaidOrder(orderDetailsPaid);

    newPaidOrder
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((err) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        }
      });
  }
});

router.put("/", isLoggedIn, (req, res, next) => {
  const {
    dateDelivery,
    dateShipping,
    isDelivered,
    isShipped,
    orderId,
  } = req.body;

  PaidOrder.findOne({ orderId: orderId })
    .then((response) => {
      if (response) {
        response.dateDelivery = dateDelivery;
        response.dateShipping = dateShipping;
        response.isDelivered = isDelivered;
        response.isShipped = isShipped;

        response.save().then((data) => {
          return res.status(200).json(data);
        });
      }
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  PaidOrder.deleteMany({ userId: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
