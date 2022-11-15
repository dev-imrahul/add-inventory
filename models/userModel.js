const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    required: [true, 'Password is required'],
    type: String,
    minlength: [8, 'password must be contain minimum 8 characters'],
    select: false
  },
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if(!this.isModified('password')) return next();
  // hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);
  next()
});

userSchema.methods.correctPassword = async function(candidatePass, dbUserPass) {
  return await bcrypt.compare(candidatePass, dbUserPass)
}

const User = mongoose.model('users', userSchema);

module.exports = User;
