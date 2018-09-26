'use strict';

const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  active: { type: Boolean },
});

const Model = mongoose.model('Contributor', Schema);

module.exports = Model;
