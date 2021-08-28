const express = require("express");
const router = express.Router();

const { isLoggedInAdmin, isLoggedIn } = require("../middlewares/middlewares");

const {
  addComment,
  deleteCommentById,
  getCommentById,
} = require("../controllers/productComment");

router.get("/:id", getCommentById);

router.post("/", isLoggedIn, addComment);

router.delete("/:id", isLoggedInAdmin, deleteCommentById);

module.exports = router;
