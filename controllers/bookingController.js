const Booking = require("../models/booking");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createBooking = async function (req, res) {
  const { creatorId, hotelId, checkIn, checkOut, totalPrice } = req.body;
  console.log("guest", req.body.guestInformation);
  console.log("body", req.body);
  const {
    firstName,
    lastName,
    address,
    email,
    phoneNumber,
  } = req.body.guestInformation;
  const { standard, deluxe } = req.body.selectedRooms;
  const { cc_number, cc_exp_month, cc_exp_year, cc_cvc } = req.body;
  //payment
  const cardToken = await stripe.tokens.create({
    card: {
      number: 4242424242424242, //cc_number,
      exp_month: cc_exp_month,
      exp_year: cc_exp_year,
      cvc: cc_cvc,
    },
  });
  const payment = await stripe.charges.create({
    amount: req.body.totalPrice / 100, //BASE UNIT = CENT
    currency: "USD",
    source: cardToken.id,
    description:
      "Payment from user ${req.user.firstName} for: booking${booking.hotelId}",
  });
  try {
    const booking = await Booking.create({
      creatorId,
      hotelId,
      checkIn,
      checkOut,
      guestInformation: {
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
      },
      selectedRooms: {
        standard,
        deluxe,
      },
      totalPrice,
      paymentId: payment.id,
    });
    return res.status(200).json({ status: "ok", data: booking });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

exports.updateBooking = async function (req, res, next) {
  try {
    const booking = await BookingModel.findById(req.params.bookingId).exec();
    if (booking.creatorId.toString() === req.token.userId) {
      (booking.hotelName = req.body.hotelName),
        (booking.checkIn = req.body.checkIn),
        (booking.checkOut = req.body.checkOut),
        (booking.guestInformation.firstName =
          req.body.guestInformation.firstName);
      booking.guestInformation.lastName = req.body.guestInformation.lastName;
      booking.guestInformation.address = req.body.guestInformation.address;
      booking.guestInformation.phoneNumber =
        req.body.guestInformation.phoneNumber;
      booking.guestInformation.email = req.body.guestInformation.email;
    } else {
      res.status(403).json({
        status: "fail",
        message: "You are not allow to update this booking",
      });
    }
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
