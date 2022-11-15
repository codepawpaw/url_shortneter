/* eslint-disable require-jsdoc */
const Logger = require('./logger');

class RestResponder {
  // 100 -199
  informational(res, status, data, message) {
    res.status(status).json({
      status,
      data,
      message,
    });
    return;
  }

  // 200 - 299
  success(res, status, data, message, optionalData = {}) {
    res.status(status).json({
      status,
      data,
      message,
      ...optionalData,
    });
    return;
  }

  // 300 - 399
  redirection(res, status, message) {
    res.status(status).json({
      message,
    });
    return;
  }

  // 400 - 499
  clientError(res, status, message, optionalData = {}) {
    Logger.error(message);
    res.status(status).json({
      error: message,
      ...optionalData,
    });
    return;
  }

  // 500 -599
  serverError(res, status, message) {
    Logger.error(message);
    res.status(status).json({
      error: message,
    });
    return;
  }
}

module.exports = new RestResponder();
