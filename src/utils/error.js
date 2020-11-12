const logger = require('../utils/logger');

/**
 * Simple class to centralize errors
 */
class ApplicationError extends Error {
  /**
   * @param {Number} statusCode error status code
   * @param {String} message custom string to be sent with error
   */
  constructor(statusCode, message) {
    super();

    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Express error handler
 * @param {ApplicationError} err ApplicationError instance
 * @param {Response} res Express response object
 */
function handleError(err, res) {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error.';

  logger.error(err, err.trace);

  res.status(statusCode).send(
      {
        status: 'error',
        statusCode,
        message,
      },
  );
}

module.exports = {
  ApplicationError,
  handleError,
};
