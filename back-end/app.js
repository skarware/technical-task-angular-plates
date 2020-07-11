const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose')

// Get MongoDB user and password from Environment Variables
const DB_USER = process.env.MONGODB_USER;
const DB_PASSWORD = process.env.MONGODB_PASSWORD;

// Connect to MongoDB
mongoose.connect('mongodb+srv://' + DB_USER + ':' + DB_PASSWORD + '@cluster0.bt62z.mongodb.net/angular-plates?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch(() => {
    console.error('Failed to connect to MongoDB')
  });

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
