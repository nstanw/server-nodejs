const GoogleAccount = require("../model/googleAccount"); // Đảm bảo rằng bạn đã import GoogleAccount từ đúng đường dẫn

// Lấy tất cả googleAccounts
exports.getAllGoogleAccounts = async (req, res) => {
  try {
    const googleAccounts = await GoogleAccount.find();
    res.send(googleAccounts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Thêm một googleAccount
exports.addGoogleAccount = async (req, res) => {
  try {
    const googleAccount = new GoogleAccount(req.body);
    await googleAccount.save();
    res.status(201).send(googleAccount);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Cập nhật một googleAccount
exports.updateGoogleAccount = async (req, res) => {
  try {
    const googleAccount = await GoogleAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!googleAccount) {
      return res.status(404).send();
    }
    res.send(googleAccount);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Xóa một googleAccount
exports.deleteGoogleAccount = async (req, res) => {
  try {
    const googleAccount = await GoogleAccount.findByIdAndDelete(req.params.id);
    if (!googleAccount) {
      return res.status(404).send();
    }
    res.send(googleAccount);
  } catch (error) {
    res.status(500).send(error);
  }
};

