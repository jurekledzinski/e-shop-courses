const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentProductSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  idCourse: {
    type: String,
    required: true,
  },
  isComment: {
    type: Boolean,
    required: true,
  },
  isRate: {
    type: Boolean,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CommentProduct", commentProductSchema);
