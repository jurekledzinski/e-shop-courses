const express = require("express");
const router = express.Router();

const OrderDetail = require("../models/orderDetails.model.js");

const { ErrorHandler } = require("../errors/error");

router.put("/", isLoggedIn, (req, res, next) => {
  const {
    name,
    surname,
    street,
    numberStreet,
    departmentState,
    postCode,
    city,
    country,
    phone,
    paymentMethod,
    userId,
    email,
    shipMethod,
    isShipped,
    isDelivered,
    isPayed,
    shippingPrice,
    cart,
    totalQtyCart,
    totalPriceCart,
    totalPriceOrder,
  } = req.body;

  const info = {
    alert: "",
  };

  if (
    !name ||
    !surname ||
    !street ||
    !numberStreet ||
    !departmentState ||
    !postCode ||
    !city ||
    !country ||
    !phone ||
    !userId
  ) {
    info.alert = "Please fill in all fields";
    return res.status(400).json(info);
  }

  if (!Boolean(info.alert)) {
    OrderDetail.findOne({ userId: userId })
      .then((response) => {
        if (response) {
          response.name = name;
          response.surname = surname;
          response.street = street;
          response.numberStreet = numberStreet;
          response.departmentState = departmentState;
          response.postCode = postCode;
          response.city = city;
          response.country = country;
          response.phone = phone;
          response.userId = userId;
          response.email = email;
          response.paymentMethod = paymentMethod;
          response.shipMethod = shipMethod;
          response.isShipped = isShipped;
          response.isDelivered = isDelivered;
          response.isPayed = isPayed;
          response.shippingPrice = shippingPrice;
          response.cart = cart;
          response.totalQtyCart = totalQtyCart;
          response.totalPriceCart = totalPriceCart;
          response.totalPriceOrder = totalPriceOrder;

          response
            .save()
            .then((data) => {
              return res.status(200).json(data);
            })
            .catch((err) => {
              next(new ErrorHandler(500, "Internal server error", err.message));
            });
        } else {
          const orderData = {
            name,
            surname,
            street,
            numberStreet,
            departmentState,
            postCode,
            city,
            country,
            phone,
            paymentMethod,
            shipMethod,
            userId,
            email,
            isShipped,
            isDelivered,
            isPayed,
            shippingPrice,
            cart,
            totalQtyCart,
            totalPriceCart,
            totalPriceOrder,
          };

          const newCustomerData = new OrderDetail(orderData);

          newCustomerData
            .save()
            .then((data) => {
              return res.status(200).json(data);
            })
            .catch((err) => {
              next(new ErrorHandler(500, "Internal server error", err.message));
            });
        }
      })
      .catch((err) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        }
      });
  }
});

router.get("/:id", isLoggedIn, (req, res, next) => {
  const id = req.params.id;

  OrderDetail.findOne({ userId: id })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server erro", err.message));
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
