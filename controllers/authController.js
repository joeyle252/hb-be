const User = require("../models/user");

exports.login = async function (req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.loginWithCredentials(email, password);
    const token = await user.generateToken();

    return res.status(200).json({ status: "ok", data: token });
  } catch (err) {
    return res.status(400).json({ status: "fail", error: err.message });
  }
};
exports.auth = async function (res, req, next) {
  return res.status(401).json({ status: "fail" });
  next();
};
