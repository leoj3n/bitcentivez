'use strict';

const errorFormat = require('donejs-error-format');

module.exports = function(app) {
  app.use(function(error, request, response, next) {
    const html = errorFormat.html(errorFormat.extract(error), {
      liveReload: process.env.NODE_ENV === 'development',
    });

    console.error(error.stack);

    response
      .status(500)
      .type('html')
      .end(html);
  });
};
