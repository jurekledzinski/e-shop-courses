const Cart = require("../models/cart.model");
const { ErrorHandler } = require("../errors/error");

const updateCart = (req, res, next) => {
  const { userId, cart, totalQtyCart, totalPriceCart } = req.body;

  let info = {
    alert: "",
  };

  if (!userId || !cart || !totalQtyCart || !totalPriceCart) {
    throw new ErrorHandler(404, "Error in cart");
  }

  if (Boolean(!info.alert)) {
    Cart.findOne({ userId: userId })
      .select("-__v")
      .then((response) => {
        if (response) {
          response.userId = userId;
          response.cart = cart;
          response.totalQtyCart = totalQtyCart;
          response.totalPriceCart = totalPriceCart;
          response.save((err, data) => {
            if (err) {
              next(new ErrorHandler(500, "Internal server error", err.message));
            }
            return res.status(200).end();
          });
        } else {
          const cartData = {
            userId: userId,
            cart: cart,
            totalQtyCart: totalQtyCart,
            totalPriceCart: totalPriceCart,
          };

          const newCart = new Cart(cartData);

          newCart.save((err, data) => {
            if (err) {
              next(new ErrorHandler(500, "Internal server error", err.message));
            }

            return res.status(200).json(data);
          });
        }
      })
      .catch((err) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        }
      });
  }
};

const getCartById = (req, res, next) => {
  const id = req.params.id;
  Cart.findOne({ userId: id }, (err, data) => {
    if (err) {
      next(new ErrorHandler(500, "Internal server error", err.message));
    }
    return res.status(200).json(data);
  });
};

const deleteCart = (req, res, next) => {
  const id = req.params.id;

  Cart.findOneAndDelete({ userId: id })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = { deleteCart, getCartById, updateCart };
