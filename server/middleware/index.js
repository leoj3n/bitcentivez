'use strict';

const errorHandler = require('./error');

module.exports = function(app) {
  if (process.argv.indexOf('--static') !== -1) {
    console.log('Configuring server app with static middleware.');
    app.configure(require('./static'));
  } else {
    console.log('Configuring server app with SSR middleware.');
    app.configure(require('./ssr'));
  }

  app.configure(errorHandler);
};
