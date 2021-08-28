const express = require("express");
const router = express.Router();

const { isLoggedInAdmin } = require("../middlewares/middlewares");

const { deleteUserById, getAllUsers } = require("../controllers/usersControl");

router.get("/", isLoggedInAdmin, getAllUsers);

router.delete("/delete/:id", isLoggedInAdmin, deleteUserById);

module.exports = router;
