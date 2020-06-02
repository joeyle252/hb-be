const express = require("express");
const router = express.Router();
const app = express();
var cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { createUser, updateUser } = require("./controllers/userController");
const { login } = require("./controllers/authController");
const {
  createHotel,
  getHotelList,
  getHotelDetail,
} = require("./controllers/hotelController");
const {
  createBooking,
  updateBooking,
} = require("./controllers/bookingController");
const checkJwt = require("./middleware/auth");

mongoose
  .connect(process.env.DB_LOCAL, {
    // some options to deal with deprecated warning, you don't have to worry about them.
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

router.post("/user", createUser);
router.put("/user/:userId", updateUser);

router.post("/auth/login", login);

router.post("/hotel", createHotel);
router.get("/hotels", getHotelList);
router.get("/hotel/:id", getHotelDetail);

router.post("/booking", createBooking);
router.put("/user/bookingId", updateBooking);

app.listen(process.env.PORT, () => {
  console.log("app is running on port ", process.env.PORT);
});
