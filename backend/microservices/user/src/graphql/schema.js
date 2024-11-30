const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getNotificationsByUserId(idUsuario: ID!): [Notification]
    getScoresByUserId(idUsuario: ID!): [Score]
    getInterestsByUserId(idUsuario: ID!): [Interest]
  }

  extend type Mutation {
    registerUser(
      email: String!
      password: String!
      codigoUniversitario: String!
      username: String!
      nombre: String!
      apellido: String!
    ): User

    loginUser(email: String!, password: String!): String

    updateUser(
      id: ID!
      interests: [InterestInput]
      scores: [ScoreInput]
      notificaciones: [NotificationInput]
    ): User

    deleteUser(id: ID!): User

    addNotification(
      idUsuario: ID!
      categoria: String!
      mensaje: String!
    ): Notification

    deleteNotification(idUsuario: ID!, notificationId: ID!): DeletionResponse

    addScore(idUsuario: ID!, categoria: String!, score: Int!): Score

    deleteScore(idUsuario: ID!, scoreId: ID!): DeletionResponse

    addInterest(
      idUsuario: ID!
      organization: String!
      location: String
      category: String!
      tags: [String]
    ): Interest

    deleteInterest(idUsuario: ID!, interestId: ID!): DeletionResponse
  }

  type User @key(fields: "id") {
    id: ID!
    email: String!
    username: String!
    nombre: String!
    apellido: String!
    codigoUniversitario: String!
    notificaciones: [Notification]
    scores: [Score]
    interests: [Interest]
    totalPuntos: Int
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
    organization: String!
    location: String
    category: String!
    tags: [String]
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
    organization: String!
    location: String
    category: String!
    tags: [String]
  }

  type DeletionResponse {
    message: String!
  }
`;
