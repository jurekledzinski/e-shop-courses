const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertOptionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AdvertChoice", advertOptionSchema);
