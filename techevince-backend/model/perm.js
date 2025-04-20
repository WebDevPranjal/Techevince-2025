const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PermSchema = new Schema({
  votingAllowed: Boolean,
});

module.exports = mongoose.model('Perm', PermSchema);