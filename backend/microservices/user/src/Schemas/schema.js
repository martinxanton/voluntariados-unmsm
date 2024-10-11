const { GraphQLSchema, GraphQLObjectType } = require("graphql");
const userQueries = require("../graphql/userQueries"); // Importas tus consultas de usuarios
//const userMutations = require("./Mutations/userMutations"); // Importas tus mutaciones de usuarios

// Definir el esquema RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQueries, // Añadir todas las consultas de usuarios que definiste en `userQueries.js`
  },
});

// Definir el esquema RootMutation (si tienes mutaciones, como crear o editar intereses)
const RootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...userQueries, // Añadir las mutaciones de usuarios, como `createUser`, `editUserInterests`, etc.
  },
});

// Exportar el esquema completo
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation, // Incluir si tienes mutaciones
});
