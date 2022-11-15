const urlShortenerHandler = require('../handler/url_shortener');

module.exports = (app) => {
  app.get(
    '/api/url_shorteners/:modified_url',
    urlShortenerHandler.get,
  );

  app.post(
    '/api/url_shorteners',
    urlShortenerHandler.post,
  );
};
