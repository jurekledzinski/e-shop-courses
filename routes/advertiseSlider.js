const express = require("express");
const router = express.Router();

const { isLoggedInAdmin } = require("../middlewares/middlewares");

const {
  createAdvertise,
  deleteAdvertise,
  getAllAdvertises,
} = require("../controllers/sliderAdverts");

router.get("/", getAllAdvertises);

router.post("/", isLoggedInAdmin, createAdvertise);

router.delete("/:id", isLoggedInAdmin, deleteAdvertise);

module.exports = router;
