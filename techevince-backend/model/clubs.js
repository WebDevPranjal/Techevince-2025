const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ClubSchema = new Schema({
  name: String,
  icons: String,
  description: String,
  links: [{
    name: String,
    link: String
  }]
});

module.exports = mongoose.model('Club', ClubSchema);