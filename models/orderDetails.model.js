const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  numberStreet: {
    type: Number,
    required: true,
  },
  departmentState: {
    type: String,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: false,
  },
  shipMethod: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  isShipped: {
    type: Boolean,
    required: false,
  },
  isDelivered: {
    type: Boolean,
    required: false,
  },
  isPayed: {
    type: Boolean,
    required: false,
  },
  shippingPrice: {
    type: Number,
    required: false,
  },
  cart: {
    type: Array,
    required: false,
  },
  totalQtyCart: {
    type: Number,
    required: false,
  },
  totalPriceCart: {
    type: Number,
    required: false,
  },
  totalPriceOrder: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("OrderDetail", orderDetailsSchema);
