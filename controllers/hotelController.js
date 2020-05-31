const Hotel = require("../models/hotel");

// just only admin can create, update, delete hotel => not setup logic for admin yet

exports.getHotelList = async function (req, res) {
  const hotels = await Hotel.find({});
  return res.status(200).json({ status: "ok", hotels: hotels });
};
exports.createHotel = async function (req, res) {
  const {
    name,
    address,
    starRating,
    description,
    availableRooms,
    roomType,
    photo,
  } = req.body;
  try {
    const hotel = await Hotel.create({
      name,
      address,
      starRating,
      description,
      availableRooms,
      roomType,
      photo,
    });
    return res.status(200).json({ status: "ok", data: hotel });
  } catch (err) {
    return res.status(401).json({ status: "fail", error: err.message });
  }
};

exports.updateHotel = async function (req, res) {};
