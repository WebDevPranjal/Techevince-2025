const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const JudgeSchema = new Schema({
  name: String,
  designation: String,
  company: String,
  image: String,
  socials: [{
    name: String,
    link: String
  }],
  description: [{
    title: String,
    description: String
  }],
});

module.exports = mongoose.model('Judge', JudgeSchema);