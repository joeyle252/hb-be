const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "hotel must have a name"],
    trim: true,
    minLength: 3,
  },
  address: {
    type: String,
    required: [true, "hotel must have address"],
    trim: true,
  },
  starRating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 500,
  },
  availableRooms: {
    type: Number,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
});

hotelSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
