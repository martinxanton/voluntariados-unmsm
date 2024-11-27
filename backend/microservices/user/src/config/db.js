const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI); // No necesitas 'useNewUrlParser' ni 'useUnifiedTopology'
    mongoose.connection.once("open", () => console.log("Conectado a MongoDB"));
  } catch (error) {
    console.error("Error de conexión a MongoDB", error);
    process.exit(1);
  }
};

module.exports = connectDB;
