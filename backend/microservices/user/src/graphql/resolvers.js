const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const resolvers = {
  getUser: async ({ id }) => {
    return await User.findById(id);
  },
  getUsers: async () => {
    return await User.find();
  },
  registerUser: async ({ email, password, codigo_universitario, username }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, codigo_universitario, username });
    return await user.save();
  },
  loginUser: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error("Credenciales invalidas");
    }
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET , { expiresIn: '1h' });
  },
  updateUser: async ({ id, interests }) => {
    return await User.findByIdAndUpdate(id, { interests }, { new: true });
  },
  deleteUser: async ({ id }) => {
    return await User.findByIdAndDelete(id);
  },
};

module.exports = resolvers;
