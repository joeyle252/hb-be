const mongoose = require("mongoose");
const validator = require("validator");

const bookingSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hotelName: {
    type: String,
    required: [true, "your booking must have a hotel name"],
    toLowerCase: true,
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
  selectedRoom: {
    roomType: {
      type: String,
      required: [true, "your booking must have a room type"],
    },
    roomQuantity: {
      type: String,
      required: [true, "your booking must have number of room"],
    },
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
