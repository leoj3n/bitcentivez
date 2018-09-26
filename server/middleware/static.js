'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  app.get('*', function(req, res, next) {
    const urlParts = path.parse(req.url);
    const isPushstateRoute = !urlParts.ext || urlParts.name.includes('?');

    if (isPushstateRoute) {
      const env = process.env.NODE_ENV || 'production';
      const htmlPath = path.join(app.get('client'), env + '.html');

      if (fs.existsSync(htmlPath)) {
        return res.sendFile(htmlPath);
      }
    }

    return next();
  });
};
