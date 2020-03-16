const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../auth/auth");
const Question = require("../models/questionModel");
const Leader = require("../models/leaderModel");

router.post("/", auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { question, answer, category, points } = req.body;
  try {
    const newQuestion = new Question({
      question,
      answer,
      category,
      points
    });
    const addQuestion = await newQuestion.save();
    res.json(addQuestion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Test");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("get failed");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let question = await Question.findById(req.params.id);

    if (!question)
      return res.status(404).json({ msg: "Question ID not found" });

    await Question.findByIdAndRemove(req.params.id);

    res.json({ msg: "Successfully removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { question, answer } = req.body;

  try {
    let question = await Question.findById(req.params.id);

    if (!question)
      return res.status(404).json({ msg: "Question id not valid" });

    question = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: questionFields },
      { new: true }
    );

    res.json(question);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: question update failed");
  }
});

module.exports = router;