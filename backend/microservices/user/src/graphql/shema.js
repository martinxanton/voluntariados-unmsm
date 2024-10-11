const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    id: ID!
    email: String!
    codigo_universitario: String!
    username: String!
    isAdmin: Boolean!
    interests: Interests
  }

  type Interests {
    organization: String
    location: String
    category: String
    tags: [String]
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    registerUser(email: String!, password: String!, codigo_universitario: String!, username: String!): User
    loginUser(email: String!, password: String!): String
    updateUser(id: ID!, interests: InterestsInput): User
    deleteUser(id: ID!): User
  }

  input InterestsInput {
    organization: String
    location: String
    category: String
    tags: [String]
  }
`);
