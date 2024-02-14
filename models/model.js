const mongoose = require('mongoose');

const ROLE = {
  ADMIN: 'admin',
  BASIC: 'teacher',
};

// Define the user schema
const userSchema = new  mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: [ROLE.ADMIN, ROLE.BASIC], required: true }
});

// Define the class schema
const classSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  className: { type: String, required: true },
  userId: { type: Number, required: true }
});

// Create the user model
const User = mongoose.model('User', userSchema);

// Create the class model
const Class = mongoose.model('Class', classSchema);

module.exports = {
  ROLE,
  User,
  Class
};