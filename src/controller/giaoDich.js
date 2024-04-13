const GoogleAccount = require("../model/googleAccount");
const User = require("../model/user");
const GiaoDich = require("../model/giaoDich"); // Đảm bảo rằng bạn đã import GiaoDich từ đúng đường dẫn

exports.getGiaoDichByUser = async (req, res) => {
  try {
    let query = {};
    if (req.params.userId) {
      query = {
        user: { $eq: req.params.userId },
      };
    }
    const giaoDichs = await GiaoDich.find(query)
      .populate("googleAccount")
      .sort({ ngayGiaoDich: -1 });
    res.send(giaoDichs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Lấy tất cả GiaoDichs
exports.getAllGiaoDich = async (req, res) => {
  try {
    let query = {};

    if (req.query.startDate && req.query.endDate) {
      const startDate = new Date(req.query.startDate).setHours(0, 0, 0, 0);
      const endDate = new Date(req.query.endDate).setHours(23, 59, 59, 999);

      query = {
        ngayGiaoDich: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    } else {
      // const currentDate = new Date().setHours(0, 0, 0, 0);

      // query = {
      //   ngayGiaoDich: {
      //     $gte: currentDate,
      //     $lte: currentDate,
      //   },
      // };
    }

    const giaoDichs = await GiaoDich.find(query)
      .populate("user")
      .populate("googleAccount")
      .sort({ ngayGiaoDich: -1 });
    res.send(giaoDichs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

// Thêm một GiaoDich
exports.addGiaoDich = async (req, res) => {
  try {
    const giaoDich = new GiaoDich(req.body);
    await giaoDich.save();
    res.status(201).send(giaoDich);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Cập nhật một GiaoDich
exports.patch = async (req, res) => {
  try {
    const giaoDich = await GiaoDich.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!giaoDich) {
      return res.status(404).send();
    }
    res.send(giaoDich);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Xóa một GiaoDich
exports.delete = async (req, res) => {
  try {
    const giaoDich = await GiaoDich.findByIdAndDelete(req.params.id);
    if (!giaoDich) {
      return res.status(404).send();
    }
    res.send(giaoDich);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Controller function to add a new transaction
// exports.addGiaoDich = async (req, res) => {
//   try {
//     // Extract necessary data from the request body
//     let { userId, newUser, taiKhoan, thongTinGiaoDich } = req.body;

//     newUser = {
//       userName: req.body.newUser.userName,
//       fullName: req.body.newUser.fullName,
//       email: req.body.newUser.email,
//       password: req.body.newUser.password,
//       facebook: req.body.newUser.facebook,
//       zalo: req.body.newUser.zalo,
//     };

//     taiKhoan = {
//       gmail: req.body.taiKhoan.gmail,
//       password: req.body.taiKhoan.password,
//       info: req.body.taiKhoan.info,
//     };

//     thongTinGiaoDich = {
//       ngayGiaoDich: req.body.thongTinGiaoDich.ngayGiaoDich,
//       isNo: req.body.thongTinGiaoDich.isNo,
//       soGold: req.body.thongTinGiaoDich.soGold,
//       soTien: req.body.thongTinGiaoDich.soTien,
//       loaiChuyenKhoan: req.body.thongTinGiaoDich.loaiChuyenKhoan,
//       note: req.body.thongTinGiaoDich.note,
//     };
//     // Check if the user exists in the database
//     let user;
//     if (userId) {
//       user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "Người dùng không tồn tại." });
//       }
//     } else {
//       user = await User.findOne({ email: newUser.email });
//       if (!user) {
//         user = new User({ ...newUser });
//         await user.save();
//       }
//     }

//     // Create a new GoogleAccount and save it to the database
//     let googleAccount = await GoogleAccount.findOne({ gmail: taiKhoan.gmail });
//     if (!googleAccount) {
//       googleAccount = new GoogleAccount({ ...taiKhoan });
//       await googleAccount.save();
//     }

//     // Create a new GiaoDich and save it to the database
//     let newGiaoDich = {
//       ...thongTinGiaoDich,
//       user: user._id,
//       googleAccount: googleAccount._id,
//     };
//     const giaoDich = new GiaoDich(newGiaoDich);
//     await giaoDich.save();

//     // Return a success response
//     res.status(200).json({ message: "Giao dịch đã được thêm thành công." });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "Đã xảy ra lỗi trong quá trình thêm giao dịch." });
//   }
// };

// exports.getAllGiaoDich = async (req, res) => {
//   try {
//     const giaoDichs = await GiaoDich.find()
//       .populate("user")
//       .populate("googleAccount");
//     res.json(giaoDichs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
