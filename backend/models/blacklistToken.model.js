const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.new,
    expires: 86400, // 24 hours in sec
  },
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
