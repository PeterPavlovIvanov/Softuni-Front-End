const express = require("express");
const User = require("../models/user");
const Twit = require("../models/twit");
const mongoose = require("mongoose");
const router = express.Router();

const getUser = async(req, res, next) => {
    let user;
    try {
        user = await User.findOne({ username: req.params.name });
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
};

router.get("/", async(req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:name", getUser, async(req, res) => {
    const twitsWritten = res.user.twits.map((t) => mongoose.Types.ObjectId(t));
    const all = await Twit.find({ _id: { $in: twitsWritten } });

    user = {};
    user.username = res.user.username;
    user.email = res.user.email;

    res.info = {
        user,
        twits: all,
    };

    res.send(res.info);
});

router.post("/", (req, res) => {
    const user1 = new User({...req.body });
    User.findOne({ $or: [{ email: user1.email }, { username: user1.username }] })
        .then(async(user) => {
            if (user) {
                let errors = {};
                console.log(user);
                if (user.username === req.body.username) {
                    errors.message = "User Name already exists";
                }
                if (user.email === req.body.email) {
                    errors.message = "Email already exists";
                }

                return res.status(400).json(errors);
            } else {
                try {
                    const newUser = await user1.save();
                    res.status(201).json(newUser);
                } catch (err) {
                    console.log(err)
                    res.status(400).json({ message: err.message });
                }
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
});


router.post("/login", async(req, res) => {
    const { username, password } = req.body

    User.findOne({ username })
        .then(async(user) => {
            if (user) {
                if (user.password === password) {
                    return res.status(200).json(user);
                } else {
                    return res.status(400).json({
                        message: "Wrong Password",
                    });
                }
            } else {
                return res.status(400).json({
                    message: "No Such User",
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
})

router.put("/:name", getUser, async(req, res) => {
    for (const attr in req.body) {
        res.user[attr] = req.body[attr];
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;