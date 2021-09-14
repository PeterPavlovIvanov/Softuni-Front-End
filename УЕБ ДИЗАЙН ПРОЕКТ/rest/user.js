const express = require("express");
const User = require("./userModel");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/logged", async(req, res) => {
    try {
        let usersArray = await User.find();
        if (usersArray == null) {
            return res.status(201).json({ message: "Няма рецепти." });
        }
        let resultRecepti = [];

        for(let i = 0; i < usersArray.length; i++)
        {
            for(let j = 0; j < usersArray[i].recepti.length; j++)
            {
                resultRecepti.push({...usersArray[i].recepti[j], author: usersArray[i].username});
            }
        }

        res.status(201).json(resultRecepti);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/:username", async(req, res) => {
    try {
        let user = await User.findOne({ username: req.params.username })
        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        res.status(201).json(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post("/signup", async(req, res) => {
    const user = new User({...req.body });
    console.log(user)
    User.findOne({ username: req.body.username })
        .then(async (userFetched) => {
            if (userFetched) {
                let errors = {};
                if (userFetched.username === req.body.username) {
                    errors.message = "User Name already exists";
                }
                return res.status(400).json(errors);
            } else {
                try {
                    const newUser = await user.save();
                    res.status(201).json(newUser);
                } catch (err) {
                    res.status(400).json({ message: err.message });
                }
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: err.message,
            });
        });
})

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

router.post("/:username", async (req, res) => {
    const { ingredients, recipe } = req.body
    const username = req.params.username
    console.log([ingredients, recipe])
    try {
        User.updateOne({ username }, {
            $push: { recepti: { ingredients, recipe } },
        },
        (error, success) => {
            if (error) {
                res.status(400).json({ message: error.message })
            }
        });
        res.status(201).json({ ingredients, recipe });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;