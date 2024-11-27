const Volunteer = require('../models/volunteer');

module.exports = {

  //Querys

  // Query para obtener todos los voluntariados

  getVolunteers: async () => {
    try {
      return await Volunteer.find();
    } catch (err) {
      throw new Error('Failed to fetch volunteers');
    }
  },

  // Query para obtener un voluntariado por ID

  getVolunteerById: async ({ id }) => {
    try {
      return await Volunteer.findById(id);
    } catch (err) {
      throw new Error('Volunteer not found');
    }
  },

  // Query para obtener los usuarios de un voluntariado

  getUsersByVolunteer: async ({ id, approved }) => {
    try {
      const volunteer = await Volunteer.findById(id);
      if (!volunteer) throw new Error('Volunteer not found');

      let users = volunteer.users;

      // Filtrar por aprobación si se especifica
      if (typeof approved !== 'undefined') {
        users = users.filter((user) => user.approved === approved);
      }

      return users;
    } catch (err) {
      throw new Error('Failed to fetch users for the volunteer');
    }
  },
  
  //Mutations

  // Mutation para crear un nuevo voluntariado
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

  // Mutation para actualizar los datos de un voluntariado
  updateVolunteer: async ({ id, title, organization, date, location, totalVac, category, tags }) => {
    try {
      // Buscar voluntariado por ID
      const volunteer = await Volunteer.findById(id);
      if (!volunteer) throw new Error('Volunteer not found');

      // Actualizar solo los campos que estén presentes
      if (title !== undefined) volunteer.title = title;
      if (organization !== undefined) volunteer.organization = organization;
      if (date !== undefined) volunteer.date = new Date(date);
      if (location !== undefined) volunteer.location = location;
      if (totalVac !== undefined) volunteer.totalVac = totalVac;
      if (category !== undefined) volunteer.category = category;
      if (tags !== undefined) volunteer.tags = tags;

      // Guardar cambios
      return await volunteer.save();
    } catch (err) {
      throw new Error('Failed to update volunteer');
    }
  },

  // Mutation para eliminar un voluntariado
  deleteVolunteer: async ({ id }) => {
    try {
      const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
      if (!deletedVolunteer) throw new Error('Volunteer not found');
      return deletedVolunteer;
    } catch (err) {
      throw new Error('Failed to delete volunteer');
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

  // Mutation para eliminar un usuario de un voluntariado

  removeUserFromVolunteer: async ({ volunteerId, userId }) => {
    try {
      const volunteer = await Volunteer.findById(volunteerId);
      if (!volunteer) throw new Error('Volunteer not found');

      const userIndex = volunteer.users.findIndex((user) => user.userId === userId);
      if (userIndex === -1) throw new Error('User not found in this volunteer');

      volunteer.users.splice(userIndex, 1); // Eliminar usuario
      return await volunteer.save();
    } catch (err) {
      throw new Error('Failed to remove user from volunteer');
    }
  },

  // Mutation para aprobar un usuario en un voluntariado

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
