// Importamos dependencias esenciales para el manejo de usuarios, encriptación y tokens.
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Resolvers para GraphQL: Definen cómo se procesan las consultas y mutaciones.
const resolvers = {
  User: {
    // Resolver para obtener un usuario a partir de su referencia (usado en subgráficos).
    __resolveReference: async ({ id }) => {
      return await User.findById(id); // Busca al usuario por su ID.
    },
  },
  Query: {
    // Obtiene un usuario específico por ID.
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
    // Obtiene todos los usuarios registrados.
    getUsers: async () => {
      return await User.find();
    },
  },
  Mutation: {
    // Registra un nuevo usuario, encriptando su contraseña antes de guardarlo.
    registerUser: async (
      _,
      { email, password, codigo_universitario, username }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10); // Encripta la contraseña.
      const user = new User({
        email,
        password: hashedPassword,
        codigo_universitario,
        username,
      });
      return await user.save(); // Guarda el usuario en la base de datos.
    },
    // Autentica a un usuario, verificando las credenciales y generando un token JWT.
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email }); // Busca al usuario por email.
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Credenciales inválidas"); // Manejo de error si las credenciales son incorrectas.
      }
      return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      }); // Genera el token.
    },
    // Actualiza los campos especificados de un usuario identificado por su ID.
    updateUser: async (
      _,
      {
        id,
        email,
        password,
        codigo_universitario,
        username,
        isAdmin,
        interests,
      }
    ) => {
      // Creamos un objeto vacío que se llenará con los campos a actualizar.
      const updates = {};

      // Agregamos al objeto solo los parámetros que se hayan proporcionado.
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10); // Encripta la nueva contraseña si se proporciona.
      if (codigo_universitario)
        updates.codigo_universitario = codigo_universitario;
      if (username) updates.username = username;
      if (isAdmin !== undefined) updates.isAdmin = isAdmin;
      if (interests) updates.interests = interests;

      // Verificamos que haya al menos un campo para actualizar.
      if (Object.keys(updates).length === 0) {
        throw new Error("No se proporcionaron campos para actualizar.");
      }

      // Actualizamos el usuario y devolvemos la versión actualizada.
      return await User.findByIdAndUpdate(id, updates, { new: true });
    },
    // Elimina un usuario de la base de datos por su ID.
    deleteUser: async (_, { id }) => {
      return await User.findByIdAndDelete(id);
    },
  },
};

// Exportamos los resolvers para integrarlos en el servidor GraphQL.
module.exports = resolvers;
