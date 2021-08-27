const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertiseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  colorDescription: {
    type: String,
    required: true,
  },
  colorTitle: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Advertise", advertiseSchema);
