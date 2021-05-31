const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { validateToken } = require('../middlewares/AuthMiddleware')

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
   const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        });
        res.json("OK");
    });
});

router.get("/info/:id", async (req, res) => {
    const { id } = req.params;

    const info = await Users.findByPk(id, {
        attributes: {
            exclude: ["password"],
        },
    });

    res.json(info);
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({
        where: {
            username: username
        }
    });

    if (!user) {
        res.json({
            error: "User doesn't exist."
        });
    }

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            res.json({
                error: "Wrong username or password."
            });
        }
        
        const accessToken = sign({
            username: user.username,
            id: user.id,
        }, "secret");

        res.json({
            token: accessToken,
            username: user.username,
            id: user.id,
        });
    });
});

router.get("/validateUser", validateToken, (req, res) => {
    res.json(req.user);
});



module.exports = router;