const mongoose = require("mongoose");

// Subesquema para intereses
const interestSchema = new mongoose.Schema({
  organization: String,
  location: String,
  category: String,
  tags: [String],
});

// Subesquema para notificaciones
const notificationSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

// Subesquema para scores
const scoreSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  score: { type: Number, required: true },
});

// Esquema principal de usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  codigoUniversitario: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  edad: { type: Number },
  carrera: { type: String },
  total_puntos: { type: Number, default: 0 },
  interests: [interestSchema], // Relaci贸n con intereses
  scores: [scoreSchema], // Relaci贸n con scores
  notificaciones: [notificationSchema], // Relaci贸n con notificaciones
});

module.exports = mongoose.model("User", userSchema);
