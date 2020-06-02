const Hotel = require("../models/hotel");

// just only admin can create, update, delete hotel => not setup logic for admin yet

exports.getHotelList = async function (req, res) {
  let page = Number(req.query.page) || 1;
  let limit = 8;
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
  //debugger;
  if (req.query.starRating) {
    const starRatings = req.query.starRating
      .split(",")
      .map((num) => Number(num)); // from ["5,4,3,2"] to ["5","4","3","2"] to [5,4,3,2]
    const starRatingQueries = starRatings.map((starRating) => {
      return { starRating: starRating };
    });
    queries.push({
      $or: starRatingQueries,
    });
  }


  if (queries.length === 0) {
    const hotels = await Hotel.find({})
      .sort({ update_at: 1 }) // keep item in the same order each time
      .skip((page - 1) * limit) // example: page=1, will skip 8 first items
      .limit(limit); //the limit return every page is 8
    return res.status(200).json({ status: "ok", hotels: hotels });
  }
  const hotels = await Hotel.find({ $and: queries })
    .sort({ update_at: 1 })
    .skip((page - 1) * limit)
    .limit(limit);
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

exports.getHotelDetail = async function (req, res, next) {
  try {
    const hotel = await Hotel.findById(req.params.id).exec();
    console.log("hotelDetail", hotel);
    return res.status(200).json({ status: "ok", hotel: hotel });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
