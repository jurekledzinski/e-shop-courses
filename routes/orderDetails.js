const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/middlewares");

const {
  addOrderDetails,
  getOrderDetailsById,
} = require("../controllers/detailsOrder");

router.put("/", isLoggedIn, addOrderDetails);

router.get("/:id", isLoggedIn, getOrderDetailsById);

module.exports = router;
