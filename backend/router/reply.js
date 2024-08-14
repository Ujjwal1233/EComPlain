const express = require("express");
const zod = require("zod");
const { Replies } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();


router.post("/createreply/:complainid", authMiddleware, async (req, res) => {
  try {
    // const { success } = createReplyBody.safeParse(req.body);
    // if (!success) return res.status(403).json({ msg: "something went wrong" });
    const reply = await Replies.create({
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: req.userId,
      complainId: req.params.complainid,
    });
    if (!reply)
      return res.status(403).json({
        msg: "something went wrong1",
      });
    else res.json({ msg: "reply created" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "not able to create reply" });
  }
});

router.get(
  "/allrepliesofcomplain/:complainid",
  async (req, res) => {
    try {
      const complainId = req.params.complainid;
      // console.log(complainId);
      // console.log(req.params);
      const replies = await Replies.find({ complainId });
      if (!replies) return res.status(403).log({ msg: "something went wrong" });
      else {
        // console.log("replies have been fetched");
        res.json({ replies });
      }
    } catch (error) {
      console.log(error);
      return res.status(411).json({ msg: "Not able to fetch replries" });
    }
  }
);

router.get("/allrepliesofuser", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const replies = await Replies.find({ userId });
    if (!replies) return res.status(403).json({ msg: "something went wrong" });
    else res.json({ replies });
  } catch (error) {
    console.log(error);
    return res
      .status(411)
      .json({ msg: "not able to get replies for this user" });
  }
});

const updateReplyBody = zod.object({
  description: zod.string(),
});

router.put(
  "/updatereply/:complainId/:replyid",
  authMiddleware,
  async (req, res) => {
    try {
      const { success } = updateReplyBody.safeParse(req.body);
      if (!success) return res.status(403).json({ msg: "Invalid Input" });
      const existingReply = await Replies.findOne({
        _id: req.params.replyid,
        complainId: req.params.complainId,
        userId: req.userId,
      });
      if (!existingReply)
        return res.status(403).json({ msg: "reoply not found" });
      existingReply.description = req.body.description;
      existingReply.updatedAt = new Date();
      existingReply.save();
    } catch (error) {
      console.log(error);
      res.status(403).json({ msg: "something went wrong" });
    }
  }
);

router.delete("/deletereply/:replyid", authMiddleware, async (req, res) => {
  try {
    const reply = await Replies.findOne({
      _id: req.params.replyid,
    });
    if (!reply) res.status(403).json({ msg: "Reply not found" });
    reply.delete();
    res.json({ msg: "reply deleted" });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "something went wrong" });
  }
});

module.exports = router;
