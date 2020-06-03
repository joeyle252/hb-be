const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "you must login before make a booking"],
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: [true, "your booking must have a hotel name"],
  },
  checkIn: {
    type: String,
    required: [true, "your booking should have check in date"],
  },
  checkOut: {
    type: String,
    required: [true, "your booking must have check out date"],
  },
  guestInformation: {
    firstName: {
      type: String,
      required: [true, "your booking must have first name"],
    },
    lastName: {
      type: String,
      required: [true, " your booking must have last name"],
    },
    email: {
      type: String,
      required: [true, "your booking must have an email"],
      toLowerCase: true,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Invalid email address");
        }
      },
    },
    address: {
      type: String,
      required: [true, "your booking must have an address"],
    },
    phoneNumber: {
      type: String,
      required: [true, "your booking must have a phone number"],
    },
  },
  cardInformation: {
    cardNumber: {
      type: String,
      required: [true, "Please enter your card number"],
    },
    expiryMonth: {
      type: Number,
      required: [true, "Please enter your expiry month card"],
    },
    expiryYear: {
      type: Number,
      required: [true, "Please enter your expiry year card"],
    },
    cvv: {
      type: String,
      required: [true, "Please enter your cvv code"],
    },
  },
  selectedRooms: {
    standard: {
      type: Number,
      required: [true, "your booking must have a number of Standard room"],
    },
    deluxe: {
      type: Number,
      required: [true, " your booking must have a number of Deluxe Room"],
    },
  },
  totalPrice: {
    type: Number,
    reuired: [true, "Please put a total price"],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
