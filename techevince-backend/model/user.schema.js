const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  name: String,
  rollno: String,
  email: String,
  accessToken: String,
  refreshToken: String,
  businessVote: {
    type: ObjectId,
    ref: 'Project',
  },
  softwareVote: {
    type: ObjectId,
    ref: 'Project',
  },
  hardwareVote: {
    type: ObjectId,
    ref: 'Project',
  },
});

module.exports.User = mongoose.model('User', userSchema);