const mongoose = require('mongoose');

// Define and create schema for plate object
const plateSchema = new mongoose.Schema({
  plateNr: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true }
});

// Retrieve a Plate model for plate schema
const plateModel = mongoose.model('Plate', plateSchema);

// Plate Model constructor provides the interface to MongoDB collections as well as creates document instances
module.exports = plateModel;
