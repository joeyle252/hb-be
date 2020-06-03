const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  cardNumber: {
    type: Number,
    required: [true, "Please fill card number information to make payment"],
  },
  expiryMonth: {
    type: Number,
    required: [true, "please fill expiry month to make payment"],
  },
  expiryYear: {
    type: Number,
    required: [true, "Please fill expiry year to make payment"],
  },
  cvc: {
    type: Number,
    required: [true, "please fill cvc code to make payment"],
  },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
