const Comment = require("../models/commentProduct.model");
const { ErrorHandler } = require("../errors/error");

const getCommentById = (req, res, next) => {
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
};

const addComment = (req, res, next) => {
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
};

const deleteCommentById = (req, res, next) => {
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
};

module.exports = { addComment, deleteCommentById, getCommentById };
