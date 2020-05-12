require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./routes');

const app = express();
const corsMiddleware = cors();

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use('/visit', routes.visit);

app.use((req, res, next) => {
  res.status(404);
  res.send();
});

app.use((error, req, res, next) => {
  res.status(500);
  res.send('there was an error with the request');
});

app.listen(process.env.PORT, (err, done) => {
  console.log('server started on port', process.env.PORT);
});

module.exports = app;
