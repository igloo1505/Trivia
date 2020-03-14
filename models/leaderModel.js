const mongoose = require("mongoose");

const LeaderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  time: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Leader", LeaderSchema);
