const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/middlewares");

const { deleteCart, getCartById, updateCart } = require("../controllers/carts");

router.put("/", isLoggedIn, updateCart);

router.get("/:id", isLoggedIn, getCartById);

router.delete("/delete/:id", isLoggedIn, deleteCart);

module.exports = router;
