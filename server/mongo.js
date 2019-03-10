const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/github_radar';

const db = {
  connect() {
    return mongoose.connect(DB_URI, { useNewUrlParser: true });
  },
  disconnect() {
    return mongoose.connection.close(() => {
      process.exit(0);
    });
  }
};

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open to ' + DB_URI);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', err => {
  console.log(err);
});

process.on('SIGINT', db.disconnect).on('SIGTERM', db.disconnect);

module.exports = db;
