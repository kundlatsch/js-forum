const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get("/", validateToken, async (req, res) => {
    const posts = await Posts.findAll({
        include: [Likes],
        order: [['createdAt', 'DESC']]
    });

    const likedPosts = await Likes.findAll({
        where: {
            UserId: req.user.id,
        }
    })

    res.json({
        listOfPosts: posts,
        likedPosts: likedPosts,
    });
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
});

router.get("/byUserId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findAll({
        where: {
            UserId: id,
        }
    });
    res.json(post);
});

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;

    await Posts.destroy({
        where: {
            id: postId,
        }
    });

  res.json("DELETED SUCCESSFULLY");
})


module.exports = router;