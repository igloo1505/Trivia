const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  adminStatus: {
    type: Boolean
  },
  organization: {
    _id: {
      type: String
    },
    organizationID: {
      type: String,
      unique: true
    },
    organizationName: {
      type: String
    }
  },

  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
