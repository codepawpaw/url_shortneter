const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config');

app = express();
app.use(bodyParser.json());

require('./route/url_shortener')(app);

app.listen(PORT);

module.exports = app