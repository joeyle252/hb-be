const User = require("../models/user");

exports.createUser = async function (req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res.status(201).json({ status: "ok", data: user });
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
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.email;
    await user.save(); // save new information
    res.json(user);
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};
