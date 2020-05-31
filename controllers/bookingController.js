const Booking = require("../models/booking");

exports.createBooking = async function (req, res) {
  const { hotelName, checkIn, checkOut } = req.body;
  const {
    firstName,
    lastName,
    address,
    email,
    phoneNumber,
  } = req.body.guestInformation;
  const { roomType, roomQuantity } = req.body.selectedRoom;

  try {
    const booking = await Booking.create({
      hotelName,
      checkIn,
      checkOut,
      guestInformation: {
        firstName,
        lastName,
        address,
        email,
        phoneNumber,
      },
      selectedRoom: {
        roomType,
        roomQuantity,
      },
    });
    return res.status(200).json({ status: "ok", data: booking });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};

// exports.updateBooking = async function (req, res, next) {
//   try {
//     (booking.hotelName = req.body.hotelName),
//       (booking.checkIn = req.body.checkIn),
//       (booking.checkOut = req.body.checkOut),
//       (booking.guestInformation.firstName = req.body.guestInformation.firstName);
//     booking.guestInformation.lastName = req.body.guestInformation.lastName;
//     booking.guestInformation.address = req.body.guestInformation.address;
//     booking.guestInformation.phoneNumber =
//       req.body.guestInformation.phoneNumber;
//     booking.guestInformation.email = req.body.guestInformation.email;
//     booking.

//   } catch (err) {
//     return res.status(400).json({ status: "fail", error: err.message });
//   }
// };
