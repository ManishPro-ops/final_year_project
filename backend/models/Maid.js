const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  weekday: String,
  weekend: String,
});

const maidSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  location: String,
  contact: String,
  services: [String],
  experience: Number,
  availability: String,
  aadhar: String,
  password: String,
  rates: {
    morning: rateSchema,
    afternoon: rateSchema,
    evening: rateSchema,
  },
});

module.exports = mongoose.model("Maid", maidSchema);
