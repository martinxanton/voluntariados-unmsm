const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getNotificationsByUserId(idUsuario: ID!): [Notification]
    getScoresByUserId(idUsuario: ID!): [Score]
    getInterestsByUserId(idUsuario: ID!): [Interest]
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  extend type Mutation {
    registerUser(
      email: String!
      password: String!
      codigoUniversitario: String!
      username: String!
      nombre: String!
      apellido: String!
      carrera: String!
      edad: Int!
      sexo: String!
      distrito: String!
      description: String
    ): User

    loginUser(email: String!, password: String!): LoginResponse!

    updateUser(
      id: ID!
      edad: Int
      password: String
      username: String
      nombre: String
      apellido: String
      description: String
      carrera: String
      sexo: String
      distrito: String
    ): User

    deleteUser(id: ID!): User

    addNotification(idUsuario: ID!, categoria: String!, mensaje: String!): User

    deleteNotification(idUsuario: ID!, notificationId: ID!): DeletionResponse

    addScore(idUsuario: ID!, categoria: String!, score: Int!): User

    deleteScore(idUsuario: ID!, scoreId: ID!): DeletionResponse

    addInterest(idUsuario: ID!, interest: String!): User

    deleteInterest(idUsuario: ID!, interestId: ID!): DeletionResponse
  }

  type User @key(fields: "id") {
    id: ID!
    email: String!
    username: String!
    nombre: String!
    apellido: String!
    codigoUniversitario: String!
    description: String
    edad: Int!
    sexo: String!
    distrito: String!
    carrera: String!
    notificaciones: [Notification]
    scores: [Score]
    interests: [Interest]
  }

  type Notification {
    id: ID!
    categoria: String!
    mensaje: String!
    fecha: String!
  }

  type Score {
    id: ID!
    categoria: String!
    score: Int!
  }

  type Interest {
    id: ID!
    interest: String!
  }

  input NotificationInput {
    id: ID
    categoria: String!
    mensaje: String!
    fecha: String
  }

  input ScoreInput {
    id: ID
    categoria: String!
    score: Int!
  }

  input InterestInput {
    id: ID
    interest: String!
  }

  type DeletionResponse {
    message: String!
  }
`;
