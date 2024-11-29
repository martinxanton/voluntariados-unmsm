const { gql } = require('apollo-server');

module.exports = gql`
  # Apollo Federation requiere una clave única en las entidades
  type Volunteer @key(fields: "id") {
    id: ID!
    title: String!
    organization: Organization!
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

  type Organization @key(fields: "id") {
    id: ID!
    name: String!
    email: String!
    phone: String
    address: String
    adminId: String!
  }

  type Query {
    getVolunteers: [Volunteer!]!
    getVolunteerById(id: ID!): Volunteer
    getUsersByVolunteer(id: ID!, approved: Boolean): [UserVolunteer!]!
    getOrganizations: [Organization!]!
    getOrganizationById(id: ID!): Organization
  }

  type Mutation {
    createVolunteer(title: String!, organization: ID!, date: String!, location: String!, totalVac: Int!, category: String!, tags: [String!]!): Volunteer!
    updateVolunteer(id: ID!, title: String, organization: ID, date: String, location: String, totalVac: Int, category: String, tags: [String]): Volunteer!
    deleteVolunteer(id: ID!): Volunteer!
    addUserToVolunteer(volunteerId: ID!, userId: String!, role: String, approved: Boolean): Volunteer!
    removeUserFromVolunteer(volunteerId: ID!, userId: String!): Volunteer!
    approveUser(volunteerId: ID!, userId: String!): Volunteer!

    createOrganization(name: String!, email: String!, phone: String, address: String, adminId: String!): Organization!
    updateOrganization(id: ID!, name: String, email: String, phone: String, address: String, adminId: String!): Organization!
    deleteOrganization(id: ID!, adminId: String!): Organization!
  }
`;
