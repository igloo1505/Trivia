const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema({
  referenceID: {
    type: String,
    required: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  organizationAdminPassword: {
    type: String,
    required: true,
  },
  organizationUserPassword: {
    type: String,
  },
  displayName: {
    type: String,
    default: "",
  },
  organizationTime: {
    type: Number,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Organization", OrganizationSchema);
