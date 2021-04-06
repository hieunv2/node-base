const { STATUS } = require("common/constants");

class APIError extends Error {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor({ message, errors, status = 500 }) {
    message = message || STATUS[status];
    super(message);

    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}

module.exports = APIError;
