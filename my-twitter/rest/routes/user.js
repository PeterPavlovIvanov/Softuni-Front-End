const express = require("express");
const User = require("../models/user");
const router = express.Router();

const getUser = async(req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
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

router.get("/:id", getUser, async(req, res) => {
    res.send(res.user);
});

router.get("/twits/:id", getUser, async(req, res) => {
    let userId = res.user
})

router.post("/", async(req, res) => {
    const user = new User({...req.body });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", getUser, async(req, res) => {
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