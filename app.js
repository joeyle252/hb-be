const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = express.Router();
const { createUser } = require("./controllers/userController");
const { login } = require("./controllers/authController");

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

router.route("/users").post(createUser);

router.route("/auth/login").post(login);

app.listen(process.env.PORT, () => {
  console.log("app is running on port ", process.env.PORT);
});
