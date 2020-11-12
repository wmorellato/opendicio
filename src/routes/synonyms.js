const express = require('express');
const logger = require('../utils/logger');
const helper = require('../dict/query-helper');
const { ApplicationError } = require('../utils/error');

const router = new express.Router();

router.get('/syn/:word', async (req, res, next) => {
  const head = req.params.word;
  logger.info(`requesting synonyms of "${head}" for ${req.connection.remoteAddress}`);

  try {
    const results = await helper.findSynonyms(head);

    if (results.total === 0) {
      throw new ApplicationError(404, `No synonyms found for word "${head}"`);
    }

    res.send(results);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
