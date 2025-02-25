const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  // Resolución de referencias para Apollo Federation
  User: {
    __resolveReference: async ({ id }) => {
      return await User.findById(id);
    },
  },

  Query: {
    // Consultas
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    getUsers: async () => {
      return await User.find();
    },
    getNotificationsByUserId: async (_, { idUsuario }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user.notificaciones;
    },
    getScoresByUserId: async (_, { idUsuario }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user.scores;
    },
    getInterestsByUserId: async (_, { idUsuario }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user.interests;
    },
  },

  Mutation: {
    // Mutaciones
    registerUser: async (
      _,
      {
        email,
        password,
        codigoUniversitario,
        username,
        nombre,
        apellido,
        description,
        carrera,
        edad,
        sexo,
        distrito,
      }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        codigoUniversitario,
        username,
        nombre,
        apellido,
        description,
        carrera,
        edad,
        sexo,
        distrito,
      });
      return await user.save();
    },
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Credenciales inválidas");
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token, user };
    },
    updateUser: async (
      _,
      {
        id,
        edad,
        password,
        username,
        nombre,
        apellido,
        description,
        carrera,
        sexo,
        distrito,
      }
    ) => {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      if (edad) {
        user.edad = edad;
      }
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      if (username) {
        user.username = username;
      }
      if (nombre) {
        user.nombre = nombre;
      }
      if (apellido) {
        user.apellido = apellido;
      }
      if (description) {
        user.description = description;
      }
      if (carrera) {
        user.carrera = carrera;
      }
      if (sexo) {
        user.sexo = sexo;
      }
      if (distrito) {
        user.distrito = distrito;
      }
      return await user.save();
    },

    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
    addNotification: async (_, { idUsuario, categoria, mensaje }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const nuevaNotificacion = {
        categoria,
        mensaje,
        fecha: new Date(),
      };
      user.notificaciones.push(nuevaNotificacion);
      return await user.save();
    },
    deleteNotification: async (_, { idUsuario, notificationId }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.notificaciones = user.notificaciones.filter(
        (notif) => notif._id.toString() !== notificationId
      );
      await user.save();
      return { message: "Notificación eliminada exitosamente" };
    },
    addScore: async (_, { idUsuario, categoria, score }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const nuevoPuntaje = { categoria, score };
      user.scores.push(nuevoPuntaje);
      user.total_puntos += score; // Actualiza el total de puntos del usuario
      return await user.save();
    },
    deleteScore: async (_, { idUsuario, scoreId }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const scoreToDelete = user.scores.id(scoreId);
      if (!scoreToDelete) {
        throw new Error("Puntaje no encontrado");
      }
      user.scores.pull(scoreId);
      user.total_puntos -= scoreToDelete.score; // Actualiza el total de puntos después de eliminar el puntaje
      await user.save();
      return { message: "Puntaje eliminado exitosamente" };
    },
    addInterest: async (_, { idUsuario, interest }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      const nuevoInteres = { interest };
      user.interests.push(nuevoInteres);
      return await user.save();
    },
    deleteInterest: async (_, { idUsuario, interestId }) => {
      const user = await User.findById(idUsuario);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      user.interests = user.interests.filter(
        (interest) => interest._id.toString() !== interestId
      );
      await user.save();
      return { message: "Interés eliminado exitosamente" };
    },
  },
};

module.exports = resolvers;
