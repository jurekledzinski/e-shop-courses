const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paidOrderSchema = new Schema({
  cart: {
    type: Array,
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
  dateDelivery: {
    type: String,
    required: false,
  },
  dateShipping: {
    type: String,
    required: false,
  },
  datePayed: {
    type: String,
    required: true,
  },
  departmentState: {
    type: String,
    required: true,
  },
  isDelivered: {
    type: Boolean,
    required: true,
  },
  isPayed: {
    type: Boolean,
    required: true,
  },
  isShipped: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  numberStreet: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  payerId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  postCode: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  shipMethod: {
    type: String,
    required: true,
  },
  shippingPrice: {
    type: Number,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  totalQtyCart: {
    type: Number,
    required: true,
  },
  totalPriceCart: {
    type: Number,
    required: true,
  },
  totalPriceOrder: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PaidOrder", paidOrderSchema);
