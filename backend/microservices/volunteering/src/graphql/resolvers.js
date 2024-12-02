const Volunteer = require("../models/volunteer");
const Organization = require("../models/organization"); // Importamos el modelo de organización

module.exports = {
  // Resolver para User (entidad externa)
  User: {
    __resolveReference(reference) {
      return reference;
    },
  },
  //agregado
  Activity: {
    users: (activity) => {
      return activity.users.map((user) => ({
        userId: { __typename: "User", id: user.userId },
        score: user.score,
      }));
    },
  },
  //agreagr otro resolver
  Volunteer: {
    organization: async (volunteer) => {
      try {
        return await Organization.findById(volunteer.organization);
      } catch (error) {
        throw new Error("Failed to fetch organization for the volunteer");
      }
    },
    users: (volunteer) => {
      return volunteer.users.map((user) => ({
        userId: { __typename: "User", id: user.userId },
        role: user.role,
        approved: user.approved,
      }));
    },
    activities: (volunteer) => {
      volunteer.activities;
    },
  },

  UserVolunteer: {
    userId: (userVolunteer) => {
      return { __typename: "User", id: userVolunteer.userId };
    },
  },

  UserActivity: {
    userId: (userActivity) => {
      return { __typename: "User", id: userActivity.userId };
    },
  },

  Organization: {
    adminId: (organization) => {
      return { __typename: "User", id: organization.adminId };
    },
  },

  Query: {
    getVolunteers: async () => {
      try {
        return await Volunteer.find().populate("organization"); // Poblamos los datos de la organización
      } catch (err) {
        throw new Error("Failed to fetch volunteers");
      }
    },
    getVolunteerById: async (_, { id }) => {
      try {
        return await Volunteer.findById(id).populate("organization"); // Poblamos los datos de la organización
      } catch (err) {
        throw new Error("Volunteer not found");
      }
    },
    getUsersByVolunteer: async (_, { id, approved }) => {
      try {
        const volunteer = await Volunteer.findById(id).populate("organization");
        if (!volunteer) throw new Error("Volunteer not found");

        let users = volunteer.users;
        if (typeof approved !== "undefined") {
          users = users.filter((user) => user.approved === approved);
        }

        return users;
      } catch (err) {
        throw new Error("Failed to fetch users for the volunteer");
      }
    },
    getOrganizations: async () => {
      try {
        return await Organization.find();
      } catch (err) {
        throw new Error("Failed to fetch organizations");
      }
    },
    getOrganizationById: async (_, { id }) => {
      try {
        return await Organization.findById(id);
      } catch (err) {
        throw new Error("Organization not found");
      }
    },
    // Query para obtener los voluntarios de una organización
    getVolunteersByOrganization: async (_, { id }) => {
      try {
        return await Volunteer.find({ organization: id });
      } catch (err) {
        throw new Error("Failed to fetch volunteers for the organization");
      }
    },
    // Obtener actividades de un voluntariado
    getActivitiesByVolunteer: async (_, { id }) => {
      try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) throw new Error("Volunteer not found");
        return volunteer.activities;
      } catch (err) {
        throw new Error("Failed to fetch activities for the volunteer");
      }
    },
  },

  Mutation: {
    createVolunteer: async (
      _,
      {
        title,
        organization,
        date_start,
        date_end,
        location,
        totalVac,
        category,
        tags,
        description,
        objectives,
      }
    ) => {
      const volunteer = new Volunteer({
        title,
        organization,
        date_start: new Date(date_start),
        date_end: new Date(date_end),
        location,
        totalVac,
        category,
        tags,
        description,
        objectives,
        users: [],
        activities: [],
      });
      try {
        return await volunteer.save();
      } catch (err) {
        throw new Error("Failed to create volunteer");
      }
    },
    updateVolunteer: async (
      _,
      {
        id,
        title,
        organization,
        date_start,
        date_end,
        location,
        totalVac,
        category,
        tags,
        description,
        objectives,
      }
    ) => {
      try {
        const volunteer = await Volunteer.findById(id);
        if (!volunteer) throw new Error("Volunteer not found");

        if (title !== undefined) volunteer.title = title;
        if (organization !== undefined) volunteer.organization = organization;
        if (date_start !== undefined) volunteer.date_start = date_start;
        if (date_end !== undefined) volunteer.date_end = date_end;
        if (location !== undefined) volunteer.location = location;
        if (totalVac !== undefined) volunteer.totalVac = totalVac;
        if (category !== undefined) volunteer.category = category;
        if (tags !== undefined) volunteer.tags = tags;
        if (description !== undefined) volunteer.description = description;
        if (objectives !== undefined) volunteer.objectives = objectives;

        return await volunteer.save();
      } catch (err) {
        throw new Error("Failed to update volunteer");
      }
    },
    deleteVolunteer: async (_, { id }) => {
      try {
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
        if (!deletedVolunteer) throw new Error("Volunteer not found");
        return deletedVolunteer;
      } catch (err) {
        throw new Error("Failed to delete volunteer");
      }
    },
    addUserToVolunteer: async (_, { volunteerId, userId, role, approved }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const existingUser = volunteer.users.find(
          (user) => user.userId === userId
        );
        if (existingUser) throw new Error("User already added to volunteer");

        volunteer.users.push({
          userId,
          role: role || "volunteer",
          approved: approved || false,
        });
        return await volunteer.save();
      } catch (err) {
        throw new Error("Failed to add user to volunteer");
      }
    },
    removeUserFromVolunteer: async (_, { volunteerId, userId }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const userIndex = volunteer.users.findIndex(
          (user) => user.userId === userId
        );
        if (userIndex === -1)
          throw new Error("User not found in this volunteer");

        volunteer.users.splice(userIndex, 1);
        return await volunteer.save();
      } catch (err) {
        throw new Error("Failed to remove user from volunteer");
      }
    },
    approveUser: async (_, { volunteerId, userId }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const user = volunteer.users.find((user) => user.userId === userId);
        if (!user) throw new Error("User not found in this volunteer");

        user.approved = true;
        return await volunteer.save();
      } catch (err) {
        throw new Error("Failed to approve user");
      }
    },
    // Mutaciones para organizaciones
    createOrganization: async (_, { name, email, phone, address, adminId }) => {
      const organization = new Organization({
        name,
        email,
        phone,
        address,
        adminId,
      });
      try {
        return await organization.save();
      } catch (err) {
        throw new Error("Failed to create organization");
      }
    },
    updateOrganization: async (
      _,
      { id, name, email, phone, address, adminId }
    ) => {
      try {
        const organization = await Organization.findById(id);
        if (!organization) throw new Error("Organization not found");

        if (adminId !== organization.adminId)
          throw new Error("Unauthorized action");

        if (name !== undefined) organization.name = name;
        if (email !== undefined) organization.email = email;
        if (phone !== undefined) organization.phone = phone;
        if (address !== undefined) organization.address = address;
        if (adminId !== undefined) organization.adminId = adminId;

        return await organization.save();
      } catch (err) {
        throw new Error("Failed to update organization");
      }
    },
    deleteOrganization: async (_, { id, adminId }) => {
      try {
        const organization = await Organization.findById(id);
        if (adminId !== organization.adminId)
          throw new Error("Unauthorized action");
        const deletedOrganization = await Organization.findByIdAndDelete(id);
        if (!deletedOrganization) throw new Error("Organization not found");
        return deletedOrganization;
      } catch (err) {
        throw new Error("Failed to delete organization");
      }
    },
    // Mutaciones para actividades

    // Crear una nueva actividad
    createActivity: async (
      _,
      { volunteerId, name, description, date_start, date_end, score }
    ) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const newActivity = {
          name,
          description,
          date_start: new Date(date_start),
          date_end: new Date(date_end),
          score,
        };

        volunteer.activities.push(newActivity);
        //return await volunteer.save();
        return volunteer.activities[volunteer.activities.length - 1];
      } catch (err) {
        throw new Error("Failed to create activity");
      }
    },
    // Agregar un usuario a una actividad
    addUserToActivity: async (
      _,
      { volunteerId, activityId, userId, score }
    ) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const activity = volunteer.activities.id(activityId);
        if (!activity) throw new Error("Activity not found");

        const existingUser = activity.users.find(
          (user) => user.userId === userId
        );
        if (existingUser) throw new Error("User already added to the activity");

        activity.users.push({ userId, score });
        await volunteer.save();

        return activity;
      } catch (err) {
        throw new Error("Failed to add user to activity");
      }
    },

    // Eliminar una actividad
    deleteActivity: async (_, { volunteerId, activityId }) => {
      try {
        const volunteer = await Volunteer.findById(volunteerId);
        if (!volunteer) throw new Error("Volunteer not found");

        const activity = volunteer.activities.id(activityId);
        if (!activity) throw new Error("Activity not found");

        activity.remove();
        await volunteer.save();
        return "Activity deleted successfully";
      } catch (err) {
        throw new Error("Failed to delete activity");
      }
    },
  },
};
