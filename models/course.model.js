const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: Array,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageRate: {
    type: Number,
    required: false,
  },
  dateMilliseconds: {
    type: Number,
    required: false,
  },
  dateString: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Course", courseSchema);
