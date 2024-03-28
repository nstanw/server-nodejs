const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
  fullName: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: true },
  facebook: { type: String },
  zalo: { type: String },
});

module.exports = mongoose.model("User", userSchema);
