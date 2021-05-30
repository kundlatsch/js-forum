const express = require('express');
const router = express.Router();
const { validateToken }  = require('../middlewares/AuthMiddleware');
const { Likes } = require('../models');

router.post("/", validateToken, async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;

    const found = await Likes.findOne({
        where: {
            PostId,
            UserId,
        }
    });

    if (!found) {
        await Likes.create({
            PostId,
            UserId,
        });
        res.json({
            liked: true,
        });
    }
    else {
        await Likes.destroy({
            where: {
                PostId: PostId,
                UserId: UserId,
            }
        });
        res.json({
            likes: false
        });
    }
});




module.exports = router;