const express = require("express");
const router = express.Router();
const Organization = require("../models/Organization");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const config = require("config");
const bcrypt = require("bcryptjs");

router.put("/:id", auth, async (req, res) => {
  console.log("received req as ", req.body);

  const {
    referenceID,
    organizationName,
    organizationUserPassword,
    DisplayName,
    organizationTime,
  } = req.body;
  console.log(req.body);

  let id = req.params.id;

  try {
    let orgAccess = await Organization.findOne({ _id: referenceID });
    console.log(orgAccess);
    if (!orgAccess) {
      return res.status(404).json({ msg: "Unable to edit Organization" });
    }
    let fieldHolder = {};
    if (organizationName) {
      fieldHolder.organizationName = organizationName;
    }
    if (organizationUserPassword) {
      fieldHolder.organizationUserPassword = organizationUserPassword;
    }
    if (DisplayName) {
      fieldHolder.displayName = DisplayName;
    }
    if (organizationTime) {
      fieldHolder.organizationTime = organizationTime;
    }

    console.log("retrieved Organization to update as ", orgAccess);
    orgAccess = await Organization.findByIdAndUpdate(
      referenceID,
      { $set: fieldHolder },
      { new: true }
    );
    res.json(fieldHolder);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Failed to update Organization");
  }
});

// router.post("/", async (req, res) => {
//   const { organizationName, adminPassword, userPassword } = req.body;
//   console.log("reached Organization route");
//   console.log({ name, adminPassword, userPassword });
//   try {
//     let org = await Organization.findOne({ email: email });
//     console.log("masterCheck " + masterCheck);

//     org = new Organization({
//       organizationName,
//       adminPassword,
//       userPassword
//     });

//     console.log(
//       "Add check of server side array of organizations, and add the name of their organization and that organization ID to each user at line 58"
//     );

//     await org.save();

//     const payload = {
//       org: {
//         id: org.id
//       }
//     };
//     jwt.sign(
//       payload,
//       config.get("jwtSecret"),
//       {
//         expiresIn: 3600
//       },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error(err.msg);
//     res.status(500).send("server error: failed register");
//   }
// });

module.exports = router;
