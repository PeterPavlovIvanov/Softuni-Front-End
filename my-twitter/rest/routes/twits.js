const express = require("express");
const Twit = require("../models/twit");
const User = require("../models/user");
const router = express.Router();

const getTwit = async(req, res, next) => {
    let twit;
    try {
        twit = await Twit.findById(req.params.id);
        if (twit == null) {
            return res.status(404).json({ message: "Cannot find twit" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.twit = twit;
    next();
};

router.get("/", async(req, res) => {
    try {
        const twit = await Twit.find();
        res.json(twit);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getTwit, async(req, res) => {
    res.send(res.twit);
});

router.post("/", async(req, res) => {
    const twit = new Twit({...req.body });

    User.exists({ username: req.body.username }, async(err, doc) => {
        if (err) {
            res.status(400).json({ message: err.message });
        } else {
            if (doc) {
                try {
                    const newTwit = await twit.save();
                    User.updateOne({ username: newTwit.username }, {
                            $addToSet: { twits: newTwit._id },
                        },
                        (error, success) => {
                            if (error) {
                                console.log(error);
                            }
                        }
                    );
                    res.status(201).json(newTwit);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            } else {
                res.status(400).json({ message: "No such user" });
            }
        }
    });
});

router.put("/:id", getTwit, async(req, res) => {
    for (const attr in req.body) {
        res.twit[attr] = req.body[attr];
    }
    try {
        const updatedTwit = await res.twit.save();
        res.json(updatedTwit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;