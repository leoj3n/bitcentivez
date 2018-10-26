'use strict';

const path = require('path');
const ssrMiddleware = require('done-ssr-middleware');

module.exports = function(app) {
  app.use(
    ssrMiddleware(
      {
        config: path.join(app.get('client'), 'package.json!npm'),
        liveReload: process.env.NODE_ENV === 'development',
      },
      {
        debug: process.env.NODE_ENV === 'development',
      }
    )
  );
};
