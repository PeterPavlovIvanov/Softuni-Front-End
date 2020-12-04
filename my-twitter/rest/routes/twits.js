const express = require("express");
const Twit = require("../models/twit");
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

    try {
        const newTwit = await twit.save();
        res.status(201).json(newTwit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", getTwit, async(req, res) => {
    for (const attr in req.body) {
        res.twit[attr] = req.body[attr];
    }
    console.log(res.twit);
    try {
        const updatedTwit = await res.twit.save();
        res.json(updatedTwit);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;