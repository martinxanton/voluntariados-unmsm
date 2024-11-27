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
    getUsersByVolunteer(id: ID!, approved: Boolean): [UserVolunteer!]!
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

    updateVolunteer(
      id: ID!
      title: String
      organization: String
      date: String
      location: String
      totalVac: Int
      category: String
      tags: [String!]
    ): Volunteer!

    deleteVolunteer(id: ID!): Volunteer!

    addUserToVolunteer(
      volunteerId: ID!
      userId: String!
      role: String
      approved: Boolean
    ): Volunteer!

    removeUserFromVolunteer(
      volunteerId: ID!
      userId: String!
    ): Volunteer!

    approveUser(
      volunteerId: ID!
      userId: String!
    ): Volunteer!
  }
`);
