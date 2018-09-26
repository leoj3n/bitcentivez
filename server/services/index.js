'use strict';

const mongoose = require('mongoose');
const contributor = require('./contributor');

module.exports = function(app) {
  mongoose.Promise = global.Promise;

  // connect to mongodb so services can query
  if (process.env.TESTING !== 'true') {
    mongoose.connect(
      app.get('mongodb'),
      {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
      }
    );
  }

  // configure the service endpoints
  app.configure(contributor);
};
