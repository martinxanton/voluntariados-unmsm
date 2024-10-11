const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
} = graphql;
const { User } = require("../models/users");
const UserType = require("../TypeDefs/userType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      async resolve() {
        return await User.find();
      },
    },
    getUser: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await User.findById(args.id);
      },
    },
  },
});

// Mutaciones
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Registro de usuario
    createUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        code: { type: GraphQLInt },
        username: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const newUser = new User({
          email: args.email,
          password: args.password,
          code: args.code,
          username: args.username,
        });
        return await newUser.save();
      },
    },
    // Editar intereses de usuario
    updateUserInterests: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        organization: { type: GraphQLString },
        location: { type: GraphQLString },
        category: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args) {
        return await User.findByIdAndUpdate(
          args.id,
          {
            interests: {
              organization: args.organization,
              location: args.location,
              category: args.category,
              tags: args.tags,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
