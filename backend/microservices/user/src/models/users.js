const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 225,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  interests: {
    organization: { type: String, default: null }, // Organización de interés opcional
    location: { type: String, default: null }, // Ubicación de interés opcional
    category: { type: String, default: null }, // Categoría de interés opcional
    tags: [{ type: String, default: [] }], // Lista de etiquetas opcional
  },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
