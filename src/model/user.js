const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: false },
  fullName: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: false },
  facebook: { type: String },
  zalo: { type: String },
  sdt: { type: String },
  note: { type: String },
  googleAccount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GoogleAccount",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
