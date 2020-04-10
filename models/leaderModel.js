const mongoose = require("mongoose");

const LeaderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organizationReference: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leader", LeaderSchema);
