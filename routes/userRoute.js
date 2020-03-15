const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

router.post(
  "/",
  [
    check("name", "A Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with at least 8 characters"
    ).isLength({ min: 8 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { name, password, email, organization, city, state } = req.body;
    console.log("reached server");
    console.log({ name, password, email, organization, city, state });
    try {
      let user = await User.findOne({ email: email });

      // const masterCheck = await bcrypt.compare(
      //   organization,
      //   config.get("organizationPassword")
      // );
      // console.log("masterCheck " + masterCheck);
      // if (masterCheck == false) {
      //   return res.status(400).json({
      //     msg: "Organization password is required to become an administrator"
      //   });
      // }
      let organizationId = await Organization.findOne({
        organizationAdminPassword: organization
      });
      console.log(organizationId);
      if (organizationId == null && organization !== "") {
        res
          .status(500)
          .send(
            "If you're not an admin, do not submit an organization password"
          );
      }

      user = new User({
        name,
        password,
        email,
        organization,
        city,
        state
      });

      console.log(
        "Add check of server side array of organizations, and add the name of their organization and that organization ID to each user at line 58"
      );
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.msg);
      res.status(500).send("server error: failed register");
    }
  }
);

module.exports = router;
