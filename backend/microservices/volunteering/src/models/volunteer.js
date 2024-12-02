const mongoose = require("mongoose");

// Subesquema para usuario-voluntario
const userVolunteerSchema = new mongoose.Schema({
  userId: {
    type: String,  // Cambiado de ObjectId a String para Federation
    required: true,
  },
  role: { type: String, default: "volunteer" },
  approved: { type: Boolean, default: false },
});

// Subesquema para usuarios en actividades
const userActivitySchema = new mongoose.Schema({
  userId: {
    type: String,  // Cambiado de ObjectId a String para Federation
    required: true,
  },
  score: { type: Number, required: true, min: 0, max: 100 }
});

// Subesquema para actividades
const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  state: { type: Boolean, required: true, default: true },
  score: { type: Number, required: true, min: 0, max: 100 },
  users: [userActivitySchema],  // Usando el nuevo schema para usuarios en actividades
});

// Modelo principal para Voluntarios
const VolunteerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: {
    type: String,  // Cambiado de ObjectId a String
    required: true,
  },
  date_create: { type: Date, default: Date.now },
  date_start: { type: Date, required: true },
  date_end: { type: Date, required: true },
  location: { type: String, required: true },
  totalVac: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  description: { type: String, default: "", maxlength: 500 },
  objectives: { type: String, default: "", maxlength: 128 },
  users: [userVolunteerSchema],
  activities: [activitySchema],
});

module.exports = mongoose.model("Volunteer", VolunteerSchema);