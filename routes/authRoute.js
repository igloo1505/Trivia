const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../auth/auth");
const Question = require("../models/questionModel");
const User = require("../models/userModel");

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
    const admin = await User.findById(req.user.id).isSelected("-password");
    res.json(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "not authorized" });
  }
});

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
      let admin = await Admin.findOne({ name });
      if (!admin) {
        return res.status(400).json({ msg: "invalid user credentials" });
      }
      const match = await bcrypt.compare(password, Admin.password);
      const OrgMatch = await bcrypt.compare(
        password,
        config.get("organizationPassword")
      );
      if (!match && !OrgMatch) {
        return res.status(400).json({ msg: "invalid password" });
      }
      const payload = {
        admin: {
          id: admin.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, admin });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error at authenticate user");
    }
  }
);

// router.get("/", auth, async (req, res) => {
//   try {
//     const questions = await Question.find();
//     res.json(questions);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("get failed");
//   }
// });

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
