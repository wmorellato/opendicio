/* eslint-disable require-jsdoc */

const mongoose = require('mongoose');
const { createModel } = require('../../src/models/dict');

const AurelioDb = createModel('AurelioDict', 'aurelio-dict');
const HouaissDb = createModel('HouaissDict', 'houaiss-dict');

const bananaId = new mongoose.Types.ObjectId();
const bananaEntry = {
  _id: bananaId,
  head: 'banana',
  ethimology: 'ban + ana',
  new_norm: false,
  slang: false,
  foreign: false,
  definitions: [],
};

async function setupDatabase() {
  await AurelioDb.deleteMany();
  await HouaissDb.deleteMany();

  await new AurelioDb(bananaEntry).save();
  await new HouaissDb(bananaEntry).save();
}

module.exports = {
  bananaEntry,
  setupDatabase,
};
