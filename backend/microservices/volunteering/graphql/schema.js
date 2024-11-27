const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Volunteer {
    id: ID!
    title: String!
    organization: String!
    date: String!
    location: String!
    totalVac: Int!
    category: String!
    tags: [String!]!
    users: [UserVolunteer!]!
  }

  type UserVolunteer {
    userId: String!
    role: String!
    approved: Boolean!
  }

  type Query {
    getVolunteers: [Volunteer!]!
    getVolunteerById(id: ID!): Volunteer
  }

  type Mutation {
    createVolunteer(
      title: String!
      organization: String!
      date: String!
      location: String!
      totalVac: Int!
      category: String!
      tags: [String!]!
    ): Volunteer!

    addUserToVolunteer(
      volunteerId: ID!
      userId: String!
      role: String
      approved: Boolean
    ): Volunteer!

    approveUser(
      volunteerId: ID!
      userId: String!
    ): Volunteer!
  }
`);
