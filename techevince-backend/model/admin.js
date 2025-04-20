const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const AdminSchema = new Schema({
  username: String,
  password: String,
});

AdminSchema.pre('save', function (next) {
  const admin = this;
  if (!admin.isModified('password')) {
    return next();
  }
  /*const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(admin.password, salt);
  admin.password = hash;*/
  next();
});

module.exports = mongoose.model('Admin', AdminSchema);