const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: String,
  designation: String,
  image: String,
  club: { type: Schema.Types.ObjectId, ref: "Club" },
  orderBy: Number,
});

module.exports = mongoose.model("Team", TeamSchema);
