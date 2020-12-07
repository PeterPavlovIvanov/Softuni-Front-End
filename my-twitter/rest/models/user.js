const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    twits: {
        type: Array,
        required: true,
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema);