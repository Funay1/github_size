const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/routes');

app.use(bodyParser.json());
app.use(routes);
module.exports = http.createServer(app);