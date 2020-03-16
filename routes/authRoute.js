const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../auth/auth");
const Question = require("../models/questionModel");
const User = require("../models/userModel");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).isSelected("-password");
    res.json(user);
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
    const { email, password } = req.body;
    console.log(email, password);
    try {
      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res.status(400).json({ msg: "invalid user credentials" });
      }
      const match = await bcrypt.compare(password, user.password);
      console.log("match" + match);

      //   const OrgMatch = await bcrypt.compare(
      //     password,
      //     config.get("organizationPassword")
      //   );
      if (!match) {
        return res.status(400).json({ msg: "invalid password" });
      }
      if (match) {
        user = {
          name: user.name,
          email: user.email,
          organization: user.organization,
          city: user.city,
          state: user.state
        };
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      console.log(payload);
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
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
