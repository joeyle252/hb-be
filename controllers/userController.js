const User = require("../models/user");

exports.createUser = async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    const token = await user.generateToken();

    return res
      .status(201)
      .json({ status: "ok", user: { ...user.toJSON(), token } });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      error: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    //changed old => to new
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save(); // save new information
    res.json(user);
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
