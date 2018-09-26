'use strict';

const service = require('feathers-mongoose');
const Model = require('./model');

module.exports = function(app) {
  app.use(
    '/api/contributors',
    service({
      Model: Model,
      lean: true,
    })
  );

  app.service('/api/contributors').hooks({
    after(context) {
      context.data && delete context.data.__v;
    },
  });
};
