const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/middlewares");

const { updateProfileUser } = require("../controllers/profileUser");

router.put("/", isLoggedIn, updateProfileUser);

module.exports = router;
