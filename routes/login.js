const express = require("express");
const router = express.Router();

const { notLoggedIn } = require("../middlewares/middlewares");

const { loginUser } = require("../controllers/loginControl");

router.post("/", notLoggedIn, loginUser);

module.exports = router;
