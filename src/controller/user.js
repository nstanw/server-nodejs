const User = require("../model/user");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res, next) => {
  const user = new User({
    userName: req.body.userName,
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    facebook: req.body.facebook,
    zalo: req.body.zalo,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}