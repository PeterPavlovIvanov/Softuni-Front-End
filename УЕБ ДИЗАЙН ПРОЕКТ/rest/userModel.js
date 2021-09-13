const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    recepti: {
        type: Array,
        required: true,
        default: [],
    },
});

module.exports = mongoose.model("User", userSchema);