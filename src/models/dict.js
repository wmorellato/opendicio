const mongoose = require('mongoose');

const dictSchema = new mongoose.Schema({
  head: {
    type: String,
    required: true,
  },
  foreign: {
    type: Boolean,
    required: true,
  },
  slang: {
    type: Boolean,
    required: true,
  },
  new_norm: {
    type: Boolean,
    required: true,
  },
  ethimology: {
    type: String,
    required: true,
  },
  definition: {
    type: Array,
    required: true,
  },
  synonyms: {
    type: Array,
    required: false,
  },
  antonyms: {
    type: Array,
    required: false,
  },
  homonyns: {
    type: Array,
    required: false,
  },
});

/**
 * Create and return a new MongoDB model
 * @param {String} name name of the model
 * @param {String} collection name of the collection in MongoDB
 * @return {mongoose.model} Mongoose Model
 */
function createModel(name, collection) {
  return mongoose.model(name, dictSchema, collection);
}

module.exports = {
  createModel,
};
