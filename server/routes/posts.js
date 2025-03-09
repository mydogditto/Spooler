const express = require("express");
const router = express.Router();
const { Posts } = require("../database/models/Posts");
const { Patterns } = require("../database/models/Pattern");
const { Fabrics } = require("../database/models/Fabrics");
const { Notions } = require("../database/models/Notions");

// new post
router.post("/", async (req, res) => {
  try {
    const newPost = await Posts.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("err creating post", err);
    res.sendStatus(500);
  }
});

// get posts/feed
router.get("/", async (req, res) => {
  try {
    const [posts, patterns, fabrics, notions] = await Promise.all([
      Posts.find().sort({ createdAt: -1 }),
      Patterns.find().sort({ createdAt: -1 }),
      Fabrics.find().sort({ createdAt: -1 }),
      Notions.find().sort({ createdAt: -1 }),
    ]);

    const feed = [
      ...posts.map((post) => ({ ...post.toObject(), type: "post" })),
      ...patterns.map((pattern) => ({
        ...pattern.toObject(),
        type: "pattern",
      })),
      ...fabrics.map((fabric) => ({ ...fabric.toObject(), type: "fabric" })),
      ...notions.map((notion) => ({ ...notion.toObject(), type: "notion" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(feed);
  } catch (err) {
    console.error("err getting post feed", err);
    res.status(500);
  }
});

// delete post
router.delete("/:postId", async (req, res) => {
  try {
    const deleted = await Posts.findByIdAndDelete(req.params.postId);
    res.json(deleted);
  } catch (err) {
    console.error("err deleting post", err);
    res.sendStatus(500);
  }
});

// update post
router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    console.error("err updating post", err);
    res.sendStatus(500);
  }
});

// like post
router.put("/:postId/like", async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Posts.findById(req.params.postId);
    // already liked
    const liked = post.likes.includes(userId);
    if (liked) {
      // unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      // like
      post.likes.push(userId);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    console.error("err liking post", err);
    res.sendStatus(500);
  }
});

module.exports = router;
