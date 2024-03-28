const GoogleAccount = require("../model/googleAccount");
const GiaoDich = require("../model/giaoDich");
const User = require("../model/user");

// Import necessary modules and dependencies

// Controller function to add a new transaction
exports.addGiaoDich = async (req, res) => {
  try {
    // Extract necessary data from the request body
    let { userId, newUser, taiKhoan, thongTinGiaoDich } = req.body;

    newUser = {
      userName: req.body.newUser.userName,
      fullName: req.body.newUser.fullName,
      email: req.body.newUser.email,
      password: req.body.newUser.password,
      facebook: req.body.newUser.facebook,
      zalo: req.body.newUser.zalo,
    };

    taiKhoan = {
      gmail: req.body.taiKhoan.gmail,
      password: req.body.taiKhoan.password,
      info: req.body.taiKhoan.info,
    };

    thongTinGiaoDich = {
      ngayGiaoDich: req.body.thongTinGiaoDich.ngayGiaoDich,
      isNo: req.body.thongTinGiaoDich.isNo,
      soGold: req.body.thongTinGiaoDich.soGold,
      soTien: req.body.thongTinGiaoDich.soTien,
      loaiChuyenKhoan: req.body.thongTinGiaoDich.loaiChuyenKhoan,
      note: req.body.thongTinGiaoDich.note,
    };
    // Check if the user exists in the database
    let user;
    if (userId) {
      user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }
    } else {
      user = await User.findOne({ email: newUser.email });
      if (!user) {
        user = new User({ ...newUser });
        await user.save();
      }
    }

    // Create a new GoogleAccount and save it to the database
    let googleAccount = await GoogleAccount.findOne({ gmail: taiKhoan.gmail });
    if (!googleAccount) {
      googleAccount = new GoogleAccount({ ...taiKhoan });
      await googleAccount.save();
    }

    // Create a new GiaoDich and save it to the database
    let newGiaoDich = {
      ...thongTinGiaoDich,
      user: user._id,
      googleAccount: googleAccount._id,
    };
    const giaoDich = new GiaoDich(newGiaoDich);
    await giaoDich.save();

    // Return a success response
    res.status(200).json({ message: "Giao dịch đã được thêm thành công." });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi trong quá trình thêm giao dịch." });
  }
};

exports.getAllGiaoDich = async (req, res) => {
  try {
    const giaoDichs = await GiaoDich.find()
      .populate("user")
      .populate("googleAccount");
    res.json(giaoDichs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
