const { gql } = require("apollo-server");

module.exports = gql`

    type Volunteer @key(fields: "id") {
      id: ID!
      title: String!
      organization: Organization!
      date_create: String!
      date_start: String!
      date_end: String!
      location: String!
      totalVac: Int!
      category: String!
      tags: [String!]
      users: [UserVolunteer!]
      activities: [Activity!]
    }

    type User @key(fields: "id") {
      id: ID!
    }

    type UserVolunteer {
      userId: User!  
      role: String!
      approved: Boolean!
    }

    type Activity {
      id: ID!
      date_start: String!
      date_end: String!
      state: Boolean!
      score: Int!
      name: String!
      description: String!
      users: [UserActivity!]
    }

    type UserActivity {
      userId: User!  
      score: Int!
    }

    type Organization @key(fields: "id") {
      id: ID!
      name: String!
      email: String!
      phone: String
      address: String
      adminId: User!
    }

    type Query {
      getVolunteers: [Volunteer!]!
      getVolunteerById(id: ID!): Volunteer
      getUsersByVolunteer(id: ID!, approved: Boolean): [UserVolunteer!]!
      getOrganizations: [Organization!]!
      getOrganizationById(id: ID!): Organization
      getVolunteersByOrganization(id: ID!): [Volunteer!]!
      getActivitiesByVolunteer(id: ID!): [Activity!]!
    }

    type Mutation {
      createVolunteer(
        title: String!
        organization: ID!
        date_start: String!
        date_end: String!
        location: String!
        totalVac: Int!
        category: String!
        tags: [String!]!
      ): Volunteer!
      
      updateVolunteer(
        id: ID!
        title: String
        date_start: String
        date_end: String
        location: String
        totalVac: Int
        category: String
        tags: [String]
      ): Volunteer!
      
      deleteVolunteer(id: ID!, organization: ID!): Volunteer!
      
      addUserToVolunteer(
        volunteerId: ID!
        userId: ID!  
        role: String!
        approved: Boolean!
      ): Volunteer!
      
      removeUserFromVolunteer(volunteerId: ID!, userId: ID!): Volunteer!
      
      approveUser(volunteerId: ID!, userId: ID!): Volunteer!

      createOrganization(
        name: String!
        email: String!
        phone: String
        address: String
        adminId: ID!  
      ): Organization!
      
      updateOrganization(
        id: ID!
        name: String
        email: String
        phone: String
        address: String
        adminId: ID!  
      ): Organization!
      
      deleteOrganization(id: ID!, adminId: ID!): Organization!

      createActivity(
        volunteerId: ID!
        name: String!
        description: String!
        date_start: String!
        date_end: String!
        state: Boolean!
        score: Int!
      ): Activity!

      deleteActivity(id: ID!, volunteerId: ID!): Activity!
}
  `;
