const mongoose = require("mongoose");

const twitSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  usersLike: {
    type: Array,
    required: true,
    default: [],
  },
  usersDislike: {
    type: Array,
    required: true,
    default: [],
  },
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Twit", twitSchema);
