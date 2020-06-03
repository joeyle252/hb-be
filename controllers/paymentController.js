const Payment = require("../models/payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res, next) => {
  try {
    const { cc_number, cc_exp_month, cc_exp_year, cc_cvc } = req.body;
    const cardToken = await stripe.tokens.create({
      card: {
        card: {
          number: cc_number,
          exp_month: cc_exp_month,
          exp_year: cc_exp_year,
          cvc: cc_cvc,
        },
      },
    });
    const payment = await stripe.charges.create({
      amount: req.body.totalPrice / 100, //BASE UNIT = CENT
      currency: "USD",
      source: cardToken.id,
      description:
        "Payment from user ${req.user.firstName} for: booking${booking.hotelId}",
    });
    return res.status(200).json({ status: "ok", data: payment });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
