const express = require("express");
const router = express.Router();

const { roleAdmin } = require("../configs/config");
const Comment = require("../models/commentProduct.model");

const { ErrorHandler } = require("../errors/error");

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Comment.find({ idCourse: id })
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.post("/", isLoggedIn, (req, res, next) => {
  const {
    comment,
    date,
    idCourse,
    isComment,
    isRate,
    rate,
    title,
    userId,
    username,
  } = req.body;

  const info = {
    alert: "",
  };

  if (
    !comment ||
    !date ||
    !idCourse ||
    !isComment ||
    !isRate ||
    !rate ||
    !title ||
    !userId ||
    !username
  ) {
    throw new ErrorHandler(
      400,
      "Please fill in, all fields in comment form and rate product"
    );
  }

  if (!Boolean(info.alert)) {
    const customerReview = {
      comment,
      date,
      idCourse,
      isComment,
      isRate,
      rate,
      title,
      userId,
      username,
    };
    const newComment = new Comment(customerReview);

    const info1 = {
      success: "",
    };

    newComment
      .save()
      .then((response) => {
        if (response) {
          info1.success = "Your review is added";
          return res.status(200).json(info1);
        }
      })
      .catch((err) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        }
      });
  }
});

router.delete("/:id", isLoggedInAdmin, (req, res, next) => {
  const id = req.params.id;

  Comment.deleteMany({ idCourse: id })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function isLoggedInAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    const userRole = req.session.person.role;
    if (userRole === roleAdmin) {
      return next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}
