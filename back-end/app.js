const express = require('express');
const logger = require('morgan');

const platesRouter = require('./routes/plates');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Disable Cross-Origin Resource Sharing (CORS), nevertheless in bigger project probably better idea to use cors middleware package
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/api/plates', platesRouter);

module.exports = app;
