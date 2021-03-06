const express = require("express");
const router = express.Router();

const auth = require("../auth/auth");
const Question = require("../models/questionModel");

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  console.log("reached part one");
  const {
    question,
    imageHolder,
    difficulty,
    correctAnswer,
    wrongAnswerOne,
    wrongAnswerTwo,
    wrongAnswerThree,
    submittedBy: { name, email, organizationName, organizationReference },
  } = req.body;
  console.log("reached part two");
  try {
    const newQuestion = new Question({
      question,
      imageHolder,
      difficulty,
      correctAnswer,
      wrongAnswerOne,
      wrongAnswerTwo,
      wrongAnswerThree,
      submittedBy: {
        name,
        email,
        organizationName,
        organizationReference,
      },
    });
    console.log("reached part three");
    const addQuestion = await newQuestion.save();

    return res.json({ addQuestion });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error at question POST");
  }
});

router.get("/:organizationReference/randomize", auth, async (req, res) => {
  try {
    let ref = req.params.organizationReference;
    console.log("ref : ", ref);
    const questions = await Question.find({
      "submittedBy.organizationReference": ref,
    });

    const randomize = (arr) => {
      let returnedArray = [];
      do {
        let randomIndex = Math.floor(Math.random() * questions.length);
        returnedArray.push(questions[randomIndex]);
        questions.splice(randomIndex, 1);
      } while (questions.length >= 1);
      return returnedArray;
    };

    let newReturn = randomize(questions);

    res.json(newReturn);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("failed to get randomized array");
  }
});

router.get("/:organizationReference", auth, async (req, res) => {
  try {
    let ref = req.params.organizationReference;
    console.log("ref : ", ref);
    const questions = await Question.find({
      "submittedBy.organizationReference": ref,
    }).sort({ date: -1 });
    res.json(questions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("questions GET failed");
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
  console.log(req);
  const {
    submittedBy: { name, email, organizationName, organizationReference },
    _id,
    question,
    correctAnswer,
    wrongAnswerOne,
    wrongAnswerTwo,
    wrongAnswerThree,
  } = req.body;

  try {
    let ques = await Question.findById(req.params.id);

    if (!ques) return res.status(404).json({ msg: "Question id not valid" });
    let FieldHolder = {};

    if (name) FieldHolder.name = name;
    if (email) FieldHolder.email = email;
    if (organizationName) FieldHolder.organizationName = organizationName;
    if (organizationReference)
      FieldHolder.organizationReference = organizationReference;

    if (question) FieldHolder.question = question;
    if (correctAnswer) FieldHolder.correctAnswer = correctAnswer;
    if (wrongAnswerOne) FieldHolder.wrongAnswerOne = wrongAnswerOne;
    if (wrongAnswerTwo) FieldHolder.wrongAnswerTwo = wrongAnswerTwo;
    if (wrongAnswerThree) FieldHolder.wrongAnswerThree = wrongAnswerThree;

    ques = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: FieldHolder },
      { new: true }
    );

    res.json(ques);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error: question update failed");
  }
});

module.exports = router;
