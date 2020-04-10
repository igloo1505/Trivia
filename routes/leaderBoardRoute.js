const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../auth/auth");
const Leader = require("../models/leaderModel");

router.post("/", auth, async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   });
  // }
  const {
    name,
    organizationReference,
    organizationName,
    city,
    state,
    points,
  } = req.body;
  console.log(req.body);
  try {
    const newLeader = new Leader({
      name,
      organizationReference,
      organizationName,
      city,
      state,
      points,
    });
    const addLeader = await newLeader.save();
    res.json(addLeader);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Error at add leader");
  }
});

router.get("/:organizationReference", auth, async (req, res) => {
  try {
    let ref = req.params.organizationReference;
    const leaders = await Leader.find({
      organizationReference: ref,
    })
      .limit(10)
      .sort({ points: -1 });
    let returnArray = [];

    for (var i = 0; i < 10; i++) {
      returnArray.push(leaders[i]);
    }

    res.json(leaders);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("failed at get leaders");
  }
});

// router.delete("/:id", auth, async (req, res) => {
//   try {
//     let question = await Question.findById(req.params.id);

//     if (!question)
//       return res.status(404).json({ msg: "Question ID not found" });

//     await Question.findByIdAndRemove(req.params.id);

//     res.json({ msg: "Successfully removed" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
