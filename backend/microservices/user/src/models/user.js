const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  codigo_universitario: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  interests: {
    organization: String,
    location: String,
    category: String,
    tags: [String],
  }
});

module.exports = mongoose.model('User', userSchema);
