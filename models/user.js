const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
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
  tokens: [
    {
      type: String,
    },
  ],
});

userSchema.methods.toJSON = function () {
  let newObj = this.toObject();
  delete newObj.password;
  delete newObj.__v;
  return newObj;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
