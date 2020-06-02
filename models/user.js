const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "User must have a first name"],
    trim: true,
    toLowerCase: true,
    minLength: 3,
  },
  lastName: {
    type: String,
    required: [true, "User must have a last name"],
    trim: true,
    toLowerCase: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    trim: true,
    unique: true,
    lowercase: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: [true, "User must have a password"],
  },
});

userSchema.statics.loginWithCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) throw new Error("User not found");
  const allow = await bcrypt.compare(password.toString(), user.password);
  if (!allow) throw new Error("Incorrect Password");

  return user;
};

userSchema.methods.generateToken = async function () {
  const jsonToken = jwt.sign(
    { email: this.email, id: this._id },
    process.env.JWT_SECRET
  );
  return jsonToken;
};

userSchema.methods.toJSON = function () {
  let newObj = this.toObject();
  delete newObj.password;
  delete newObj.__v;
  return newObj;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashPassword = await bcrypt.hash(this.password, saltRounds);
  this.password = hashPassword;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
