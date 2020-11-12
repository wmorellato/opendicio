const { createModel } = require('../models/dict');
const config = require('../../config/dicts');

/**
 * Manager class for dict providers
 */
class QueryHelper {
  /**
   * Instantiates a new Manager instance.
   */
  constructor() {
    this.providers = [];

    config.providers.forEach((p) => {
      this.providers.push({
        name: p.name,
        collection: p.collection,
        model: createModel(p.name, p.collection),
      });
    });
  }

  /**
   * Query all dict providers for meanings.
   * @param {String} word word request by user
   * @return {Promise} Promised that will resolve to the query results
   */
  async findMeaning(word) {
    const results = { total: 0, dicts: [], data: {} };

    // ugly but I couldn't find another way to return
    // results together with the dict name
    for (let i = 0; i < this.providers.length; i++) {
      const p = this.providers[i];
      const docs = await p.model.find({ head: word }, '-_id');

      results.data[p.name] = docs;
      results.dicts.push(p.name);
      results.total += docs.length;
    }

    return results;
  }

  /**
   * Query all dict providers for synonyms.
   * @param {String} word word request by user
   * @return {Promise} Promised that will resolve to the query results
   */
  async findSynonyms(word) {
    const results = { total: 0, dicts: [], data: {} };

    for (let i = 0; i < this.providers.length; i++) {
      const p = this.providers[i];
      const docs = await p.model.find({ head: word }, 'synonyms -_id');

      results.dicts.push(p.name);

      if (docs.length > 0 && docs[0].synonyms) {
        results.data[p.name] = docs[0].synonyms;
        results.total += docs[0].synonyms.length;
      }
    }

    return results;
  }
}

const helper = new QueryHelper();

module.exports = helper;
