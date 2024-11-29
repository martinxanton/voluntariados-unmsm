const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  adminId: { type: String, required: true },
});

module.exports = mongoose.model("Organization", OrganizationSchema);
