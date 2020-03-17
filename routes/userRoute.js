const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/userModel");
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");
const config = require("config");
const { uuid } = require("uuidv4");
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
    const { name, password, email, organizationString, city, state } = req.body;
    console.log("reached server");
    console.log({ name, password, email, organizationString, city, state });
    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      let organizationId = await Organization.find({
        $or: [
          { organizationAdminPassword: organizationString },
          { organizationUserPassword: organizationString }
        ]
      });
      let xy = JSON.parse(organizationId);
      console.log("to object returns: ", xy);
      delete xy._id;
      console.log("second to object after mutation : " + xy);
      const {
        id,
        organizationName,
        organizationAdminPassword,
        organizationUserPassword
      } = organizationId[0]; //
      console.log("organizationAdminPassword", organizationAdminPassword);

      console.log("organizationId as : " + organizationId[0]);
      console.log("organizationName", organizationName);
      let AdminStatus;
      if (organizationAdminPassword === organizationString) {
        AdminStatus = true;
      } else if (organizationUserPassword === organizationString) {
        AdminStatus = false;
      }
      console.log("AdminStatus " + AdminStatus);
      console.log("organizationId: " + organizationId);

      if (organizationId == null && organizationString !== "") {
        res
          .status(500)
          .send(
            "If you're not an admin, do not submit an organization password"
          );
      }
      console.log("id as " + organizationId[0].id);
      // let organizationInput = {
      //   organizationID: ,
      //   organizationName: organizationName
      // };
      // console.log("organizationInput", organizationInput);
      user = new User({
        name,
        password,
        email,
        adminStatus: AdminStatus,
        organizationReference: organizationId[0].id,
        organizationName: organizationId[0].organizationName,
        city,
        state
      });
      console.log("user: " + user);

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
      console.error(err);
      res.status(500).send("server error: failed register");
    }
  }
);

module.exports = router;
