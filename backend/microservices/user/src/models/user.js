const mongoose = require("mongoose");

// Subesquema para intereses
const interestSchema = new mongoose.Schema({
  interest: { type: String, required: true },
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
  description: { type: String },
  edad: { type: Number, required: true },
  sexo: { type: String, enum: ["M", "F"], required: true },
  distrito: { type: String, required: true },
  carrera: { type: String, required: true },
  interests: [interestSchema], // Relaci贸n con intereses
  scores: [scoreSchema], // Relaci贸n con scores
  notificaciones: [notificationSchema], // Relaci贸n con notificaciones
});

module.exports = mongoose.model("User", userSchema);
