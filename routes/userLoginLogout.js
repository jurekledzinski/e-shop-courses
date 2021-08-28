const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/middlewares");

const { getUser, logoutUser } = require("../controllers/loginLogoutControl");

router.get("/", getUser);

router.delete("/logout", isLoggedIn, logoutUser);

module.exports = router;
