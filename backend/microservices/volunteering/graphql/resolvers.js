const Volunteer = require('../models/volunteer');

module.exports = {
  getVolunteers: async () => {
    try {
      return await Volunteer.find();
    } catch (err) {
      throw new Error('Failed to fetch volunteers');
    }
  },

  getVolunteerById: async ({ id }) => {
    try {
      return await Volunteer.findById(id);
    } catch (err) {
      throw new Error('Volunteer not found');
    }
  },

  createVolunteer: async (args) => {
    const { title, organization, date, location, totalVac, category, tags } = args;
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

  addUserToVolunteer: async ({ volunteerId, userId, role, approved }) => {
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

  approveUser: async ({ volunteerId, userId }) => {
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
};
