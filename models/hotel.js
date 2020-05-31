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
  availableRooms: [
    {
      type: { type: String, required: true },
      roomQuantity: { type: Number, required: true },
      price: { type: Number, required: true },
      _id: false,
    },
  ],

  photos: [
    {
      type: String,
      required: true,
    },
  ],
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
