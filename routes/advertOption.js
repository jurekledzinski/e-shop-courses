const express = require("express");
const router = express.Router();

const { isLoggedInAdmin } = require("../middlewares/middlewares");

const {
  getAllAdvertOptions,
  updateAdvertOption,
} = require("../controllers/optionAdvert");

router.get("/", getAllAdvertOptions);

router.put("/", isLoggedInAdmin, updateAdvertOption);

module.exports = router;
