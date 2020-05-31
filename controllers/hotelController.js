const Hotel = require("../models/hotel");

// just only admin can create, update, delete hotel => not setup logic for admin yet

exports.getHotelList = async function (req, res) {
  // let queries = [];
  // if (req.query.userId) {
  //     queries.push( {creatorId: req.query.userId })
  // }
  // if (req.query.categoryId) {
  //     queries.push({categoryIds: req.query.categoryId })
  // }
  let queries = [];

  if (req.query.destination) {
    queries.push({
      address: { $regex: req.query.destination, $options: "i" },
    });
  }
  if (req.query.roomQuantity) {
    //need to sanitize (clean or validate) req.query.roomQuantity
    queries.push({
      $where: `function () {
        const totalRooms =
          this.availableRooms[0].roomQuantity +
          this.availableRooms[1].roomQuantity;
        if (totalRooms >= ${req.query.roomQuantity}) {
          return true;
        }
        return false;
      }`,
    });
  }
  if (queries.length === 0) {
    const hotels = await Hotel.find({});
    return res.status(200).json({ status: "ok", hotels: hotels });
  }
  const hotels = await Hotel.find({ $and: queries });
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
    photos,
  } = req.body;
  try {
    const hotel = await Hotel.create({
      name,
      address,
      starRating,
      description,
      availableRooms,
      roomType,
      photos,
    });
    return res.status(200).json({ status: "ok", data: hotel });
  } catch (err) {
    return res.status(401).json({ status: "fail", error: err.message });
  }
};

exports.updateHotel = async function (req, res) {};
