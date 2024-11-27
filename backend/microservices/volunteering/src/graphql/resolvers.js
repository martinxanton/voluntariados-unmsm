const Volunteer = require('../models/volunteer');
const Organization = require('../models/organization'); // Importamos el modelo de organización

module.exports = {
  Volunteer: {
    // Resolver para manejar referencias de entidades
    __resolveReference: async (reference) => {
      return await Volunteer.findById(reference.id);
    },
  },

  Query: {
    getVolunteers: async () => {
      try {
        return await Volunteer.find().populate('organization'); // Poblamos los datos de la organización
      } catch (err) {
        throw new Error('Failed to fetch volunteers');
      }
    },
    getVolunteerById: async (_, { id }) => {
      try {
        return await Volunteer.findById(id).populate('organization'); // Poblamos los datos de la organización
      } catch (err) {
        throw new Error('Volunteer not found');
      }
    },
    getUsersByVolunteer: async (_, { id, approved }) => {
      try {
        const volunteer = await Volunteer.findById(id).populate('organization');
        if (!volunteer) throw new Error('Volunteer not found');

        let users = volunteer.users;
        if (typeof approved !== 'undefined') {
          users = users.filter((user) => user.approved === approved);
        }

        return users;
      } catch (err) {
        throw new Error('Failed to fetch users for the volunteer');
      }
    },
    getOrganizations: async () => {
      try {
        return await Organization.find();
      } catch (err) {
        throw new Error('Failed to fetch organizations');
      }
    },
    getOrganizationById: async (_, { id }) => {
      try {
        return await Organization.findById(id);
      } catch (err) {
        throw new Error('Organization not found');
      }
    },
  },

  Mutation: {
    createVolunteer: async (_, { title, organization, date, location, totalVac, category, tags }) => {
      const volunteer = new Volunteer({
        title,
        organization,
        date,
        location,
        totalVac,
        category,
        tags,
        users: [],
      });
      try {
        return await volunteer.save();
      } catch (err) {
        throw new Error('Failed to create volunteer');
      }
    },
    updateVolunteer: async (_, { id, title, organization, date, location, totalVac, category, tags }) => {
      try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) throw new Error('Volunteer not found');

        if (title !== undefined) volunteer.title = title;
        if (organization !== undefined) volunteer.organization = organization;
        if (date !== undefined) volunteer.date = new Date(date);
        if (location !== undefined) volunteer.location = location;
        if (totalVac !== undefined) volunteer.totalVac = totalVac;
        if (category !== undefined) volunteer.category = category;
        if (tags !== undefined) volunteer.tags = tags;

        return await volunteer.save();
      } catch (err) {
        throw new Error('Failed to update volunteer');
      }
    },
    deleteVolunteer: async (_, { id }) => {
      try {
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
        if (!deletedVolunteer) throw new Error('Volunteer not found');
        return deletedVolunteer;
      } catch (err) {
        throw new Error('Failed to delete volunteer');
      }
    },
    addUserToVolunteer: async (_, { volunteerId, userId, role, approved }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error('Volunteer not found');

        const existingUser = volunteer.users.find((user) => user.userId === userId);
        if (existingUser) throw new Error('User already added to volunteer');

        volunteer.users.push({ userId, role: role || 'volunteer', approved: approved || false });
        return await volunteer.save();
      } catch (err) {
        throw new Error('Failed to add user to volunteer');
      }
    },
    removeUserFromVolunteer: async (_, { volunteerId, userId }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error('Volunteer not found');

        const userIndex = volunteer.users.findIndex((user) => user.userId === userId);
        if (userIndex === -1) throw new Error('User not found in this volunteer');

        volunteer.users.splice(userIndex, 1);
        return await volunteer.save();
      } catch (err) {
        throw new Error('Failed to remove user from volunteer');
      }
    },
    approveUser: async (_, { volunteerId, userId }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error('Volunteer not found');

        const user = volunteer.users.find((user) => user.userId === userId);
        if (!user) throw new Error('User not found in this volunteer');

        user.approved = true;
        return await volunteer.save();
      } catch (err) {
        throw new Error('Failed to approve user');
      }
    },

    // Mutaciones para organizaciones
    createOrganization: async (_, { name, email, phone, address }) => {
      const organization = new Organization({
        name,
        email,
        phone,
        address,
      });
      try {
        return await organization.save();
      } catch (err) {
        throw new Error('Failed to create organization');
      }
    },

    updateOrganization: async (_, { id, name, email, phone, address }) => {
      try {
        const organization = await Organization.findById(id);
        if (!organization) throw new Error('Organization not found');

        if (name !== undefined) organization.name = name;
        if (email !== undefined) organization.email = email;
        if (phone !== undefined) organization.phone = phone;
        if (address !== undefined) organization.address = address;

        return await organization.save();
      } catch (err) {
        throw new Error('Failed to update organization');
      }
    },

    deleteOrganization: async (_, { id }) => {
      try {
        const deletedOrganization = await Organization.findByIdAndDelete(id);
        if (!deletedOrganization) throw new Error('Organization not found');
        return deletedOrganization;
      } catch (err) {
        throw new Error('Failed to delete organization');
      }
    },
  },
};
