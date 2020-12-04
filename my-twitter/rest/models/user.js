const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    default: [],
  },
  twits: {
    type: Array,
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);
