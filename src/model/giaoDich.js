const mongoose = require("mongoose");

const giaoDichSchema = new mongoose.Schema({
  ngayGiaoDich: {
    type: Date,
    required: true,
  },
  isNo: {
    type: Boolean,
    required: true,
  },
  soGold: {
    type: Number,
    required: true,
  },
  soTien: {
    type: Number,
    required: true,
  },
  loaiChuyenKhoan: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  googleAccount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GoogleAccount",
      required: true,
    },
  ],
  note: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
});

const GiaoDich = mongoose.model("GiaoDich", giaoDichSchema);

module.exports = GiaoDich;
