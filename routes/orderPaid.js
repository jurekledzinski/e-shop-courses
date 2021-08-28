const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/middlewares");

const {
  addPaidOrder,
  deletePaidOrderById,
  getAllPaidOrders,
  getPaidOrderById,
  updatePaid,
} = require("../controllers/paidOrder");

router.get("/", isLoggedIn, getAllPaidOrders);

router.get("/:id", isLoggedIn, getPaidOrderById);

router.post("/", isLoggedIn, addPaidOrder);

router.put("/", isLoggedIn, updatePaid);

router.delete("/:id", deletePaidOrderById);

module.exports = router;
