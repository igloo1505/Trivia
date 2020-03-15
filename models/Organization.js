const mongoose = require("mongoose");

const OrganizationSchema = mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  organizationAdminPassword: {
    type: String,
    required: true
  },
  organizationUserPassword: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Organization", OrganizationSchema);
