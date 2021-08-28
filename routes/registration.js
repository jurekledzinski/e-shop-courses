const express = require("express");
const router = express.Router();

const { notLoggedIn } = require("../middlewares/middlewares");

const { registerUser } = require("../controllers/registerControl");

router.post("/user", notLoggedIn, registerUser);

module.exports = router;
