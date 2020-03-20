const cloudinary = require("cloudinary").v2;
const functions = require("firebase-functions");
const gcs = require("@google-cloud/storage")();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../auth/auth");
const config = require("config");

router.post("/:photoName", (req, res) => {
  res.send({ msg: "connected post route" });
});

exports.uploadPhoto = functions.https.onRequest((req, res) => {
  res.status(200).send({ msg: "it worked" });
});
