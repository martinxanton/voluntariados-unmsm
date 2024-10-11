const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    code: { type: GraphQLInt },
    username: { type: GraphQLString }, // Agregando el campo de username
    isAdmin: { type: GraphQLBoolean },
    interests: {
      organization: { type: GraphQLString },
      location: { type: GraphQLString },
      category: { type: GraphQLString },
      tags: { type: new GraphQLList(GraphQLString) },
    },
  }),
});

module.exports = UserType;
