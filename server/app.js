'use strict';

const path = require('path');
const cors = require('cors');
const services = require('./services');
const compress = require('compression');
const favicon = require('serve-favicon');
const middleware = require('./middleware');
const express = require('@feathersjs/express');
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio');
const configuration = require('@feathersjs/configuration');

const app = express(feathers());

app.configure(configuration());

app
  .options('*', cors())
  .use(cors())
  .use(compress())
  .use(favicon(path.join(app.get('client'), 'favicon.ico')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .configure(express.rest())
  .configure(socketio())
  .configure(services)
  .use(express.static(app.get('client')))
  .use('/node_modules', (req, res) => {
    res.sendStatus(404);
  })
  .configure(middleware);

app.on('connection', connection => {
  app.channel('anonymous').join(connection);
});

app.publish((data, context) => {
  return app.channel('anonymous');
});

module.exports = app;
