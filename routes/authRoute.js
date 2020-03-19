const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const auth = require("../auth/auth");
const Question = require("../models/questionModel");
const Organization = require("../models/Organization");
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

      if (!match) {
        return res.status(400).json({ msg: "invalid password" });
      }
      let orgReturn = {};

      let org = await Organization.findById(user.organizationReference);

      orgReturn.referenceID = org.referenceID;
      orgReturn.organizationName = org.organizationName;
      orgReturn.organizationUserPassword = org.organizationUserPassword;
      orgReturn.displayName = org.displayName;

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
          res.json({ token, user, orgReturn });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error at authenticate user");
    }
  }
);

module.exports = router;
