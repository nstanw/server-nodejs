const User = require("../model/user");

exports.getAllUser = async (req, res, next) => {
  try {

    const limit = parseInt(req.query.limit) || 500;
    const searchTerm = req.query.q || '';

    const users = await User.find().limit(limit).sort({ createdAt: -1 });

    if (!searchTerm) {
      return res.json(users);
    } else {
      return res.json(users.filter(user => user.fullName.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res, next) => {
  const user = new User(req.body);
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
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
