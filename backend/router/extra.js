const express = require("express");
const { ForbiddenWords, Topics } = require("../db");
const router = express.Router();

router.post("/addtopics", async (req, res) => {
  try {
    const allTopics = req.body.topics;
    const topics = allTopics.split(",");
    for (let i = 0; i < topics.length; i++) {
      const existingTopic = await Topics.findOne({ topics: topics[i] });
      if (!existingTopic) {
        await Topics.create({
          topic: topics[i],
        });
      }
    }
    res.json({
      msg: "topics added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({ msg: "topics not added" });
  }
});
router.get("/alltopics", async (req, res) => {
  try {
    const alltopics = await Topics.find({});
    if (!alltopics) {
      res.status(403).json({
        msg: "something went wrong",
      });
    }
    res.json({
      topics: alltopics,
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      msg: "not able to retieve the topics",
    });
  }
});

router.post("/addwords", async (req, res) => {
  try {
    const allWords = req.body.words;
    const words = allWords.split(",");
    for (let i = 0; i < words.length; i++) {
      const existingWord = await ForbiddenWords.findOne({ word: words[i] });
      if (!existingWord) {
        await ForbiddenWords.create({
          word: words[i],
        });
      }
    }
    res.json({
      msg: "words added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({ msg: "words not added" });
  }
});
router.get("/allwords", async (req, res) => {
  try {
    const allwords = await ForbiddenWords.find({});
    if (!allwords) {
      res.status(403).json({
        msg: "something went wrong",
      });
    }
    res.json({
      words: allwords,
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      msg: "not able to retieve the words",
    });
  }
});

module.exports = router;
