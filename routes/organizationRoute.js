const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
  const { organizationName, adminPassword, userPassword } = req.body;
  console.log("reached Organization route");
  console.log({ name, adminPassword, userPassword });
  try {
    let org = await Organization.findOne({ email: email });
    console.log("masterCheck " + masterCheck);

    org = new Organization({
      organizationName,
      adminPassword,
      userPassword
    });

    console.log(
      "Add check of server side array of organizations, and add the name of their organization and that organization ID to each user at line 58"
    );

    await org.save();

    const payload = {
      org: {
        id: org.id
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
});

module.exports = router;
