const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  totalVac: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  users: [
    {
      userId: { type: String, required: true },
      role: { type: String, default: 'volunteer' },
      approved: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
